export class Time {
  public static OneHour = new Time(1, 0);
  public static OneMinute = new Time(0, 1);

  private _hour: number;
  private _min: number;

  constructor(hour: number, min: number) {
    this._min = min % 60;
    this._hour = hour + Math.floor(min / 60);
  }

  public get hour(): number {
    return this._hour;
  }

  public get min(): number {
    return this._min;
  }

  public get absoluteValue(): number {
    return this.hour + this.min / 60;
  }

  public toString(): string {
    return `${this.hour > 9 ? "" : "0"}${this.hour}:${this.min > 9 ? "" : "0"}${this.min}`;
  }

  public static fromAbsoluteValue(value: number): Time {
    const hour = Math.trunc(value);
    const min = Math.round((value - hour) * 60);
    return new Time(hour, min);
  }

  public static parse(timeString: string): Time {
    if (timeString === undefined) {
      return new Time(0, 0);
    }

    const [h, m] = timeString.split(":").map(x => parseInt(x));
    return new Time(h, m);
  }

  public isBefore(t2: Time): boolean {
    return Time.compare(this, t2) < 1;
  }

  public isAfter(t2: Time): boolean {
    return Time.compare(this, t2) > 1;
  }

  public add(t2: Time): Time {
    return new Time(this._hour + t2._hour, this._min + t2._min);
  }

  public floor(): Time {
    return new Time(this._hour, 0);
  }

  public ceil(): Time {
    return new Time(this._min > 0 ? this._hour + 1 : this._hour, 0);
  }

  public subtract(t2: Time): Time {
    const min = this._min - t2._min;
    const hour = this._hour - t2._hour;
    if (min < 0) {
      return new Time(hour - 1, min + 60);
    }
    return new Time(hour, min);
  }

  public static compare(t1: Time, t2: Time): number {
    const a = t1._hour - t2._hour;
    return a !== 0 ? a : t1._min - t2._min;
  }

  public static equals(t1: Time, t2: Time): boolean {
    return Time.compare(t1, t2) === 0;
  }

  public static *range(start: Time, end: Time, step = Time.OneHour): Iterable<Time> {
    let x = start;
    while (Time.compare(x, end) < 1) {
      yield x;
      x = x.add(step);
    }
  }
}

export class TimeSpan {
  private _start: Time;
  private _end: Time;

  constructor(start: Time, end: Time) {
    this._start = start;
    this._end = end;
  }

  public isIntersect(other: TimeSpan): boolean {
    return this._start.isBefore(other._end) && this._end.isAfter(other._start);
  }

  public range(step = Time.OneHour): Iterable<Time> {
    return Time.range(this._start, this._end, step);
  }
}
