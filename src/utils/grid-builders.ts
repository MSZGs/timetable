import {
  GridColumnData,
  createColumnLabel,
  createRowLabel,
  createLabelTag,
  ColumnLabel,
  createDayLabel,
} from "./grid.js";
import { Day } from "../types.js";
import { Time } from "@mszgs/day-time";

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
    const values = this._data.map(x => x.absoluteMinutes);
    const minTime = Time.fromAbsoluteMinute(Math.min(...values)).floor();
    const maxTime = Time.fromAbsoluteMinute(Math.max(...values)).ceil();

    this._data.push(...Time.range(minTime, maxTime));

    const data = this._data.sort(Time.compare);
    const css = [];

    for (let index = 0; index < data.length - 1; index++) {
      const current = data[index];
      const next = data[index + 1];

      if (Time.equals(current, next)) {
        continue;
      }

      const value = next.absoluteMinutes - current.absoluteMinutes;
      const label = createRowLabel(current);

      css.push(`[${label}] ${value}fr`);
    }

    return {
      style: ["[header] 50px", ...css, "[end]"].join(" "),
      rows: [...Time.range(minTime, maxTime.subtract(Time.HOUR))],
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
      breakPoints.push(new GridColumnData(column));
      breakPoints.push(new GridColumnData(column + 1));

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

      const tags: Array<ColumnLabel> = [];
      if (current.start == 0) {
        if (current.column > 0) {
          tags.push(createDayLabel(this._days[current.column - 1], true));
        }
        tags.push(createDayLabel(this._days[current.column]));
      }

      css.push(`${createLabelTag(...tags, createColumnLabel(current))} ${value}fr`);
    }
    css.push(
      createLabelTag(
        createDayLabel(this._days[this._days.length - 1], true),
        createColumnLabel(new GridColumnData(this._days.length - 1))
      )
    );

    return { style: ["[start] 64px", ...css, `0fr [end]`].join(" ") };
  }
}
