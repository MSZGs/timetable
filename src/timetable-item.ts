import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

import { GridPositionStyleInfo } from "./utils/grid.js";
import { Day, Time, TimeAttributeConverter, TimeSpan } from "./utils/time.js";

export interface TimetableItemData {
  timeStart?: Time;
  timeEnd?: Time;
  day?: Day;
  title?: string;
}

@customElement("mszgs-timetable-item")
export class TimetableItem extends LitElement {
  @property({ type: Time, converter: TimeAttributeConverter, reflect: true, attribute: "time-start" })
  public timeStart: Time;

  @property({ type: Time, converter: TimeAttributeConverter, reflect: true, attribute: "time-end" })
  public timeEnd: Time;

  @property({ type: String, reflect: true })
  public day: Day;

  @property({ type: String, reflect: true })
  public title: string;

  @property({ attribute: false })
  public column: GridPositionStyleInfo;

  constructor(data: TimetableItemData = {}) {
    super();

    this.timeStart = data.timeStart || new Time(0, 0);
    this.timeEnd = data.timeEnd || new Time(0, 0);
    this.day = data.day || "MON";
    this.title = data.title || "";

    this.column = {};
  }

  protected update(_changedProperties: PropertyValues): void {
    super.update(_changedProperties);
    if (["timeStart", "timeEnd", "day"].some(x => _changedProperties.has(x))) {
      this.dispatchEvent(new Event("mszgs-item-changed", { bubbles: true }));
    }
  }

  public get time(): TimeSpan {
    return new TimeSpan(this.timeStart, this.timeEnd);
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: contents;
      }

      .panel {
        font-size: 14px;
        overflow: hidden;
        text-align: left;
        height: 100%;

        background: var(--mszgs-timetable-background, var(--mszgs-timetable-background-default));
        border: 2px solid;
        border-color: var(--mszgs-timetable-item-primary-color, var(--mszgs-timetable-item-primary-color-default));
        border-radius: var(--mszgs-timetable-item-border-radius, var(--mszgs-timetable-item-border-radius-default));
        box-sizing: border-box;
        color: var(--mszgs-timetable-color, var(--mszgs-timetable-color-default));
      }

      .panel-heading {
        background-color: var(--mszgs-timetable-item-primary-color, var(--mszgs-timetable-item-primary-color-default));
        border-bottom: 2px solid;
        border-color: var(--mszgs-timetable-item-primary-color, var(--mszgs-timetable-item-primary-color-default));
        padding: 5px;
      }

      .panel-body {
        padding: 8px;
      }
    `;
  }

  protected render(): TemplateResult {
    return html`
      <div class="panel" style=${styleMap(this.column)}>
        <div class="panel-heading">
          <span id="title">${this.title}</span>
        </div>
        <div class="panel-body">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static startTimeCompare(a: TimetableItem, b: TimetableItem): number {
    return Time.compare(a.timeStart, b.timeStart);
  }

  static isIntersect(a: TimetableItem, b: TimetableItem): boolean {
    return a.time.isIntersect(b.time);
  }
}
