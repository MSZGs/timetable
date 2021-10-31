import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { ColumnLabel, createRowLabel, GridPositionStyleInfo } from "./utils/grid.js";
import { Time, TimeAttributeConverter, TimeSpan } from "@mszgs/day-time";
import { Day } from "./types.js";

import { style } from "./styles/timetable-item.style.js";
export interface TimetableItemData {
  timeStart?: Time;
  timeEnd?: Time;
  day?: Day;
  title?: string;
}

@customElement("mszgs-timetable-item")
export class TimetableItem extends LitElement {
  @property({ type: Time, converter: TimeAttributeConverter, reflect: true, attribute: "start" })
  public start: Time;

  @property({ type: Time, converter: TimeAttributeConverter, reflect: true, attribute: "end" })
  public end: Time;

  @property({ type: String, reflect: true })
  public day: Day;

  @property()
  public columnStart: ColumnLabel;

  @property()
  public columnEnd: ColumnLabel;

  @state()
  private _gridData: GridPositionStyleInfo;

  constructor(data: TimetableItemData = {}) {
    super();

    this.start = data.timeStart || new Time(0, 0);
    this.end = data.timeEnd || new Time(0, 0);
    this.day = data.day || "MON";
    this.title = data.title || "";
    this.columnStart = undefined;
    this.columnEnd = undefined;

    this._gridData = {};
  }

  protected updateColumn(): void {
    this._gridData = {
      gridRowStart: createRowLabel(this.start),
      gridRowEnd: createRowLabel(this.end),
      gridColumnStart: this.columnStart ? this.columnStart : this.day,
      gridColumnEnd: this.columnEnd ? this.columnEnd : this.day + "-END",
    };
  }

  protected update(_changedProperties: PropertyValues): void {
    super.update(_changedProperties);
    if (["start", "end", "day"].some(x => _changedProperties.has(x))) {
      this.updateColumn();
      this.dispatchEvent(new Event("mszgs-item-changed", { bubbles: true }));
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.updateColumn();
  }

  public get time(): TimeSpan {
    return new TimeSpan(this.start, this.end);
  }

  static styles = [style];

  protected render(): TemplateResult {
    return html`
      <div class="panel" style=${styleMap(this._gridData)}>
        <div class="panel-heading">
          <slot name="header"></slot>
        </div>
        <div class="panel-body">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static startTimeCompare(a: TimetableItem, b: TimetableItem): number {
    return Time.compare(a.start, b.start);
  }

  static isIntersect(a: TimetableItem, b: TimetableItem): boolean {
    return a.time.isIntersect(b.time);
  }
}
