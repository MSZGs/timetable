import { Time } from "./time";

export class GridRowLabel {
  private _time: Time;

  constructor(time: Time) {
    this._time = time;
  }

  public get label(): string {
    return `r${this._time.hour}-${this._time.min}`;
  }
}
