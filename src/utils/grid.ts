import { StyleInfo } from "lit/directives/style-map";
import { Time } from "@mszgs/day-time";

export interface GridPosition {
  column: GridColumnData;
  row: GridRowData;
}

export interface GridPositionStyleInfo extends StyleInfo {
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  visibility?: "hidden" | "visible";
}

export interface GridRowData {
  start: Time;
  end: Time;
}

export function createRowLabel(time: Time): string {
  return `r${time.hour}-${time.min}`;
}

export function createColumnLabel(data: GridColumnData): string {
  const n = gcd(data.start, data.denominator);
  const start = data.start / n;
  const denominator = data.denominator / n;

  if (start === 0) {
    return `c${data.column}`;
  } else if (start === denominator) {
    return `c${data.column + 1}`;
  } else {
    return `c${data.column}-${start}I${denominator}`;
  }
}

export function createGridPositionStyleInfo(data: GridPosition): GridPositionStyleInfo {
  return {
    gridColumnStart: createColumnLabel(data.column),
    gridColumnEnd: createColumnLabel(data.column.end),
    gridRowStart: createRowLabel(data.row.start),
    gridRowEnd: createRowLabel(data.row.end),
  };
}

export class GridColumnData {
  private _column: number;
  private _start: number;
  private _span: number;
  private _denominator: number;

  constructor(column: number, start = 0, denominator = 1, span = 1) {
    this._column = column;
    this._start = start;
    this._denominator = denominator;
    this._span = span;
  }

  public get column(): number {
    return this._column;
  }

  public get start(): number {
    return this._start;
  }

  public get span(): number {
    return this._span;
  }

  public get denominator(): number {
    return this._denominator;
  }

  public get value(): number {
    return this._start / this._denominator;
  }

  public get absoluteValue(): number {
    return this._column + this.value;
  }

  public get end(): GridColumnData {
    return new GridColumnData(this._column, this._start + this._span, this._denominator, this.span);
  }

  public static compare(l1: GridColumnData, l2: GridColumnData): number {
    return l1.absoluteValue - l2.absoluteValue;
  }

  public static equals(l1: GridColumnData, l2: GridColumnData): boolean {
    return GridColumnData.compare(l1, l2) === 0;
  }
}

function gcd(x: number, y: number): number {
  x = Math.abs(x);
  y = Math.abs(y);

  while (y > 0) {
    const t = y;
    y = x % y;
    x = t;
  }

  return x;
}
