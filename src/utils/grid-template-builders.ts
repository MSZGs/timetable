import { GridColumnLabel } from "./grid-column-label";
import { GridRowLabel } from "./grid-row-label";
import { Time } from "./time";

export interface GridTemplateBuilder {
  build(): string;
}

export class GridTemplateRowBuilder implements GridTemplateBuilder {
  private _data: Time[];
  private _css: string;
  private _minTime: Time;
  private _maxTime: Time;
  private _calculated: boolean;

  constructor(data: Time[] = []) {
    this._data = data;
    this._calculated = false;
  }

  private _build(): void {
    const values = this._data.map(x => x.absoluteValue);
    this._minTime = Time.fromAbsoluteValue(Math.min(...values)).floor();
    this._maxTime = Time.fromAbsoluteValue(Math.max(...values)).ceil();

    this._data.push(...Time.range(this._minTime, this._maxTime));

    const data = this._data.sort(Time.compare);
    const css = ["[header] 50px"];

    for (let index = 0; index < data.length - 1; index++) {
      const current = data[index];
      const next = data[index + 1];

      if (Time.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      const label = new GridRowLabel(current);

      css.push(`[${label.label}] ${value}fr`);
    }

    css.push("[end]");

    this._css = css.join(" ");
    this._calculated = true;
  }

  private buildIfNot(): void {
    if (!this._calculated) {
      this._build();
    }
  }

  public addTime(time: Time): void {
    this._data.push(time);
    this._calculated = false;
  }

  public minTime(): Time {
    this.buildIfNot();
    return this._minTime;
  }

  public maxTime(): Time {
    this.buildIfNot();
    return this._maxTime;
  }

  public build(): string {
    this.buildIfNot();
    return this._css;
  }
}

export class GridTemplateColumnsBuilder implements GridTemplateBuilder {
  private _data: number[][];

  constructor(data: number[][] = []) {
    this._data = data;
  }

  public addColumn(data: number[] = [1]): void {
    this._data.push(data);
  }

  public build(): string {
    const data = this._data;
    const css = ["[start] 64px"];

    const labels: GridColumnLabel[] = [];

    for (let i = 0; i < data.length; i++) {
      data[i].forEach(x => {
        for (let k = 0; k < x; k++) {
          labels.push(new GridColumnLabel(i, k, x));
        }
      });
    }

    const sortedLabels = labels.sort(GridColumnLabel.compare);

    for (let i = 0; i < sortedLabels.length - 1; i++) {
      const current = sortedLabels[i];
      const next = sortedLabels[i + 1];

      if (GridColumnLabel.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      css.push(`[${current.label}] ${value}fr`);
    }

    css.push(`[${new GridColumnLabel(data.length - 1).label}] 0fr [end]`);

    return css.join(" ");
  }
}
