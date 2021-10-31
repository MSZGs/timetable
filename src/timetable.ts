import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import { TimetableItem } from "./timetable-item.js";
import { GridColumnData, GridPosition, createRowLabel, createDayLabel } from "./utils/grid.js";
import { GridColumnsBuilder, GridRowBuilder } from "./utils/grid-builders.js";
import { Time, TimeAttributeConverter } from "@mszgs/day-time";
import { Day } from "./types.js";

import { style } from "./styles/timetable.style.js";

@customElement("mszgs-timetable")
export class Timetable extends LitElement {
  @property({ type: Time, converter: TimeAttributeConverter, reflect: true })
  public from: Time;

  @property({ type: Time, converter: TimeAttributeConverter, reflect: true })
  public to: Time;

  @property({ type: Array, reflect: true })
  public days: Day[];

  @state()
  private _gridTemplateRows: string;

  @state()
  private _gridTemplateColumns: string;

  @state()
  private _rows: Time[];

  private _itemPositions: WeakMap<TimetableItem, GridPosition>;

  public get items(): TimetableItem[] {
    const slot = this.shadowRoot.querySelector<HTMLSlotElement>("slot:not([name])");
    if (slot === null) {
      return [];
    }
    return slot.assignedNodes({ flatten: true }).filter(v => v instanceof TimetableItem) as TimetableItem[];
  }

  constructor() {
    super();
    this._rows = [];
    this._gridTemplateRows = "";
    this._gridTemplateColumns = "";
    this.days = ["MON", "TUE", "WED", "THU", "FRI"];
    this.from = new Time(8, 0);
    this.to = new Time(16, 0);

    this._itemPositions = new WeakMap();
  }

  private _getDayIndex(day: Day): number {
    return this.days.indexOf(day);
  }

  private _getItemPosition(item: TimetableItem): GridPosition {
    if (this._itemPositions.has(item)) {
      return this._itemPositions.get(item);
    } else {
      const gridPosition: GridPosition = {
        column: new GridColumnData(this._getDayIndex(item.day)),
        row: { end: item.end, start: item.start },
      };
      this._itemPositions.set(item, gridPosition);
      return gridPosition;
    }
  }

  private _updateItem(item: TimetableItem) {
    //item.column = createGridPositionStyleInfo(this._getItemPosition(item));
  }

  private _slotChangeHandler() {
    this._updateColumns();
    this._updateRows();

    this.items.forEach(item => {
      this._updateItem(item);
    });
  }

  private _updateColumns() {
    const builder = new GridColumnsBuilder();

    builder.setDays(this.days);

    this.items.forEach(x => {
      this._getItemPosition(x).column = new GridColumnData(this._getDayIndex(x.day));
    });

    // TODO: Calculate intersections.
    /*
    for (const day of this.days) {
      const items = this.items.filter(item => item.day === day).sort(TimetableItem.startTimeCompare);

      for (const item of items) {
        const set = new Set<TimetableItem>();

        for (const otherItem of items) {
          if (item.time.isIntersect(otherItem.time)) {
            set.add(otherItem);
          }
        }
      }
    }
    */
    this.days.forEach(day => builder.setColumn(day, [1]));

    this._gridTemplateColumns = builder.build().style;
  }

  private _updateRows() {
    const builder = new GridRowBuilder();

    builder.addTime(this.from);
    builder.addTime(this.to);

    this.items.forEach(x => {
      builder.addTime(x.start);
      builder.addTime(x.end);

      this._getItemPosition(x).row = { end: x.end, start: x.start };
    });

    const { style: css, rows } = builder.build();

    this._gridTemplateRows = css;
    this._rows = rows;
  }

  protected update(changedProperties: PropertyValues): void {
    if (changedProperties.has("from") || changedProperties.has("to")) {
      this._updateRows();
    }
    if (changedProperties.has("days")) {
      this._updateColumns();
    }
    super.update(changedProperties);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._updateRows();
    this._updateColumns();
  }

  static styles = [style];

  private _rowTemplate(time: Time) {
    const startLabel = createRowLabel(time);
    const endLabel = createRowLabel(time.add(Time.HOUR));

    return html`<div class="line" style=${styleMap({ gridRowStart: startLabel })}></div>
      <div class="line-label" style=${styleMap({ gridRow: startLabel, gridRowEnd: endLabel })}>
        ${time.toString()}
      </div>`;
  }

  private _labelTemplate(day: Day) {
    return html`<div
      id=${day}
      style=${styleMap({
        gridColumn: `${createDayLabel(day)} / ${createDayLabel(day, true)}`,
      })}
      class=${classMap({ header: true, [day.toLowerCase()]: true })}
    ></div>`;
  }

  protected render(): TemplateResult {
    return html`
      <div
        class="grid"
        style=${styleMap({ gridTemplateRows: this._gridTemplateRows, gridTemplateColumns: this._gridTemplateColumns })}
      >
        <div class="contents">${this._rows.map(this._rowTemplate)}</div>
        <div class="contents">
          <div id="header" class="header"></div>
          ${this.days.map(this._labelTemplate)}
        </div>
        <div class="contents" @mszgs-item-changed=${this._slotChangeHandler}>
          <slot @slotchange=${this._slotChangeHandler}></slot>
        </div>
      </div>
    `;
  }
}
