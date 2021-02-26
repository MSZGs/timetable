import { ColumnData } from "./utils/column-data";
import { Day, dayToId } from "./utils/day";
import { GridColumnLabel } from "./utils/grid-column-label";
import { GridRowLabel } from "./utils/grid-row-label";
import Template from "./utils/template";
import { Time, TimeSpan } from "./utils/time";

import templateHtml from "./templates/timetable-item.html";
const template = new Template(templateHtml);

export interface TimetableElementData {
  [data: string]: string;
  timeStart?: string;
  timeEnd?: string;
  day?: string;
  title?: string;
}

export class TimetableItem extends HTMLElement {
  public static elementName = "mszgs-timetable-item";

  static get observedAttributes(): string[] {
    return ["data-time-start", "data-time-end", "data-day", "data-title"];
  }

  protected _panel: HTMLElement;
  protected _columnData: ColumnData;
  private _title: HTMLSpanElement;

  constructor(data: TimetableElementData = {}) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.clone());
    this._columnData = new ColumnData(0);

    this._panel = this.shadowRoot.querySelector<HTMLDivElement>(".panel");
    this._title = this.shadowRoot.querySelector<HTMLSpanElement>("span#title");

    Object.keys(data).forEach(x => (this.dataset[x] = data[x]));
  }

  protected attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (newVal === null && oldVal === newVal) {
      return;
    }

    if (name === "data-time-start" || name === "data-time-end") {
      this.updateGridRow();
    } else if (name === "data-day") {
      this.column = new ColumnData(parseInt(newVal));
    } else if (name === "data-title") {
      this._title.innerText = newVal;
    }
  }

  protected updateGridColumn(): void {
    this._panel.style.gridColumnStart = new GridColumnLabel(
      dayToId(this.day),
      this.column.start,
      this.column.denominator
    ).label;
    this._panel.style.gridColumnEnd = new GridColumnLabel(
      dayToId(this.day),
      this.column.start + this.column.span,
      this.column.denominator
    ).label;
  }

  protected updateGridRow(): void {
    this._panel.style.gridRowStart = new GridRowLabel(this.timeStart).label;
    this._panel.style.gridRowEnd = new GridRowLabel(this.timeEnd).label;
  }

  public update(): void {
    this.updateGridColumn();
    this.updateGridRow();
  }

  public get column(): ColumnData {
    return this._columnData;
  }

  public set column(n: ColumnData) {
    this._columnData = n;
    this.updateGridColumn();
  }

  public get timeStart(): Time {
    return Time.parse(this.dataset["timeStart"]);
  }

  public set timeStart(time: Time) {
    this.dataset["timeStart"] = time.toString();
  }

  public get timeEnd(): Time {
    return Time.parse(this.dataset["timeEnd"]);
  }

  public set timeEnd(time: Time) {
    this.dataset["timeEnd"] = time.toString();
  }

  public get time(): TimeSpan {
    return new TimeSpan(this.timeStart, this.timeEnd);
  }

  public get day(): Day {
    return this.dataset["day"] as Day;
  }

  public set day(day: Day) {
    this.dataset["day"] = day;
  }

  public get title(): string {
    return this.dataset["title"];
  }

  public set title(title: string) {
    this.dataset["title"] = title;
  }
}

customElements.define(TimetableItem.elementName, TimetableItem);
