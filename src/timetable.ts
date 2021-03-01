import templateHtml from "./templates/timetable.html";
import Template from "./utils/template";
import { TimetableItem, TimetableElementData } from "./timetable-item";
import { ColumnData } from "./utils/column-data";
import { Time } from "./utils/time";
import { GridTemplateColumnsBuilder, GridTemplateRowBuilder } from "./utils/grid-template-builders";
import { parseDay } from "./utils/day";
import { TimetableRow } from "./timetable-row";

const template = new Template(templateHtml);

class IntersectCalculator {
  private _arr;

  constructor(arr: TimetableItem[]) {
    this._arr = arr;
  }

  private isIntersect(t1: TimetableItem, t2: TimetableItem): boolean {
    return t1.time.isIntersect(t2.time);
  }

  public calc(): { count: number; targets: Timetable[] }[] {
    const data = this._arr;

    const graph: number[][] = new Array(data.length);

    data.forEach((item, index, array) => {
      const int: number[] = [];
      array.forEach((other, i) => {
        if (item !== other && this.isIntersect(item, other)) {
          int.push(i);
        }
      });
      graph[index] = int;
    });

    //  console.log(graph);
    /*
    const done = new Map<number, ColumnData>();
    const result = new Array<ColumnData>(data.length);
    const re = graph
      .map((v, i) => {
        return { index: i, value: v };
      })
      .sort((a, b) => a.value.length - b.value.length);
    */
    //   console.log(re);
    return;
  }
}

export class Timetable extends HTMLElement {
  public static elementName = "mszgs-timetable";

  private _changeObserver;
  private _grid: HTMLDivElement;
  private _timeline: HTMLDivElement;
  private _rows: Map<string, TimetableRow>;

  static get observedAttributes(): string[] {
    return ["data-from", "data-to"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.clone());

    this._grid = this.shadowRoot.querySelector<HTMLDivElement>(".grid");
    this._timeline = this.shadowRoot.querySelector("#timeline");
    this._rows = new Map();

    this._changeObserver = new MutationObserver(this.update.bind(this));
    this._changeObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ["data-time-start", "data-time-end", "data-day"],
      subtree: true,
    });
  }

  public add(data: TimetableElementData): void {
    this.appendChild(new TimetableItem(data));
  }

  private update() {
    this.updateTemplateColumns();
    this.updateTemplateRows();
  }

  private updateTemplateColumns() {
    const builder = new GridTemplateColumnsBuilder();

    for (let i = 0; i <= this.days; i++) {
      const items = this.items
        .filter(x => x.day === parseDay(i))
        .sort((a, b) => {
          return Time.compare(a.timeStart, b.timeStart);
        });

      if (items.length === 0) {
        builder.addColumn([1]);
        continue;
      }

      new IntersectCalculator(items).calc();

      const map = new Map<TimetableItem, Set<TimetableItem>>();

      for (const item of items) {
        const set = new Set<TimetableItem>();

        for (const otherItem of items) {
          if (/* item !== otherItem && */ item.time.isIntersect(otherItem.time)) {
            set.add(otherItem);
          }
        }

        map.set(item, set);
      }

      const config = new Map<TimetableItem, ColumnData>();

      for (const item of items) {
        const intersects = map.get(item);
        const span = intersects.size;

        config.set(item, new ColumnData(1, 0, span));
      }

      const columnData = [...config.values()].map(x => x.denominator).concat([1]);

      builder.addColumn(columnData);
    }

    this._grid.style.gridTemplateColumns = builder.build();
  }

  private updateTemplateRows() {
    const builder = new GridTemplateRowBuilder();

    const from = this.from;
    const to = this.to;

    if (from !== undefined) {
      builder.addTime(this.from);
    }

    if (to !== undefined) {
      builder.addTime(this.to);
    }

    this.items.forEach(x => {
      builder.addTime(x.timeStart);
      builder.addTime(x.timeEnd);
    });

    this._grid.style.gridTemplateRows = builder.build();

    this.updateRows(builder.minTime(), builder.maxTime());
  }

  public updateRows(from: Time, to: Time): void {
    //Hide all
    this._rows.forEach(x => x.hide());

    for (const time of Time.range(from.floor(), to.subtract(Time.OneHour))) {
      const timeLabel = time.toString();
      if (this._rows.has(timeLabel)) {
        this._rows.get(timeLabel).show();
      } else {
        const newRow = new TimetableRow(time);
        this._rows.set(timeLabel, newRow);
        this._timeline.appendChild(newRow);
      }
    }
  }

  protected attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (newVal === null) {
      return;
    }

    if (name === "data-days") {
      this.updateTemplateColumns();
    } else if (name === "data-from" || name === "data-to") {
      this.updateTemplateRows();
    }
  }

  public get from(): Time | undefined {
    const from = this.dataset["from"];
    if (from !== undefined) {
      return Time.parse(from);
    }
    return undefined;
  }

  public get to(): Time | undefined {
    const to = this.dataset["to"];
    if (to !== undefined) {
      return Time.parse(this.dataset["to"]);
    }
    return undefined;
  }

  public get days(): number {
    return 7;
    // parseInt(this.dataset["days"]);
  }

  public get items(): TimetableItem[] {
    return Array.from(this.querySelectorAll<TimetableItem>(TimetableItem.elementName));
  }
}

if (window.customElements.get(Timetable.elementName) === undefined) {
  window.customElements.define(Timetable.elementName, Timetable);
}
