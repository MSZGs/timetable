export class GridColumnLabel {
  private _numerator;
  private _denominator;
  private _row;

  constructor(row: number, numerator = 0, denominator = 1) {
    const gcd = this._gcd(numerator, denominator);
    this._numerator = numerator / gcd;
    this._denominator = denominator / gcd;

    this._row = row;
  }

  private _gcd(x: number, y: number): number {
    x = Math.abs(x);
    y = Math.abs(y);

    while (y > 0) {
      const t = y;
      y = x % y;
      x = t;
    }

    return x;
  }

  public get label(): string {
    if (this._numerator === 0) {
      return `c${this._row}`;
    } else if (this._numerator === this._denominator) {
      return `c${this._row + 1}`;
    } else {
      return `c${this._row}-${this._numerator}I${this._denominator}`;
    }
  }

  public get value(): number {
    return this._numerator / this._denominator;
  }

  public get absoluteValue(): number {
    return this._row + this.value;
  }

  public static compare(l1: GridColumnLabel, l2: GridColumnLabel): number {
    return l1.absoluteValue - l2.absoluteValue;
  }

  public static equals(l1: GridColumnLabel, l2: GridColumnLabel): boolean {
    return GridColumnLabel.compare(l1, l2) === 0;
  }
}
