import { GridColumnData, createColumnLabel, createRowLabel } from "./grid.js";
import { Day, Time } from "./time.js";

export class GridRowBuilder {
  private _data: Time[];

  constructor(data: Time[] = []) {
    this._data = data;
  }

  public addTime(time: Time): this {
    this._data.push(time);
    return this;
  }

  public build(): { style: string; rows: Time[] } {
    const values = this._data.map(x => x.absoluteValue);
    const minTime = Time.fromAbsoluteValue(Math.min(...values)).floor();
    const maxTime = Time.fromAbsoluteValue(Math.max(...values)).ceil();

    this._data.push(...Time.range(minTime, maxTime));

    const data = this._data.sort(Time.compare);
    const css = [];

    for (let index = 0; index < data.length - 1; index++) {
      const current = data[index];
      const next = data[index + 1];

      if (Time.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      const label = createRowLabel(current);

      css.push(`[${label}] ${value}fr`);
    }

    return {
      style: ["[header] 50px", ...css, "[end]"].join(" "),
      rows: [...Time.range(minTime, maxTime.subtract(Time.OneHour))],
    };
  }
}

export class GridColumnsBuilder {
  private _data: Map<Day, number[]>;
  private _days: Day[];

  constructor(days: Day[] = [], data: Map<Day, number[]> = new Map()) {
    this._data = data;
    this._days = days;
  }

  public setDays(days: Day[]): this {
    this._days = days;
    return this;
  }

  public setColumn(day: Day, data: number[] = [1]): this {
    this._data.set(day, data);
    return this;
  }

  public build(): { style: string } {
    const breakPoints: GridColumnData[] = [];

    this._days.forEach((day, column) => {
      const dayData = this._data.get(day);

      dayData.forEach(denominator => {
        for (let k = 0; k < denominator; k++) {
          breakPoints.push(new GridColumnData(column, k, denominator));
        }
      });
    });

    const sortedBreakpoints = breakPoints.sort(GridColumnData.compare);

    const css = [];
    for (let i = 0; i < sortedBreakpoints.length - 1; i++) {
      const current = sortedBreakpoints[i];
      const next = sortedBreakpoints[i + 1];

      if (GridColumnData.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      css.push(`[${createColumnLabel(current)}] ${value}fr`);
    }
    css.push(`[${createColumnLabel(new GridColumnData(this._days.length - 1))}]`);

    return { style: ["[start] 64px", ...css, `0fr [end]`].join(" ") };
  }
}
