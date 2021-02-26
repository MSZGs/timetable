export class ColumnData {
  private _row: number;
  private _start: number;
  private _span: number;
  private _denominator: number;

  constructor(row: number, start = 0, denominator = 1, span = 1) {
    this._row = row;
    this._start = start;
    this._denominator = denominator;
    this._span = span;
  }

  public get row(): number {
    return this._row;
  }

  public get start(): number {
    return this._start;
  }

  public get span(): number {
    return this._span;
  }

  public get denominator(): number {
    return this._span;
  }

  public toString(): string {
    return `${this._row}/${this._start}/${this._denominator}/${this._span}`;
  }

  public static parse(data: string): ColumnData {
    const [row, start, denominator, span] = data.split("/").map(x => parseInt(x));
    return new ColumnData(row, start, denominator, span);
  }
}
