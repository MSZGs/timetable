import { Time } from "./utils/time";
import templateString from "./templates/timetable-row.html";
import Template from "./utils/template";
import { GridRowLabel } from "./utils/grid-row-label";

export class TimetableRow extends HTMLElement {
  public static elementName = "mszgs-timetable-row";
  public static template = new Template(templateString);

  static get observedAttributes(): string[] {
    return ["data-time"];
  }

  private _line: HTMLElement;
  private _label: HTMLElement;

  constructor(time: Time) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(TimetableRow.template.clone());

    this._label = this.shadowRoot.getElementById("label");
    this._line = this.shadowRoot.getElementById("line");

    if (time !== undefined) {
      this.time = time;
    }
  }

  protected attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (newVal === null) {
      return;
    }

    if (name === "data-time") {
      this.update();
    }
  }

  protected update(): void {
    const time = this.time;
    const startLabel = new GridRowLabel(time).label;
    const endLabel = new GridRowLabel(time.add(Time.OneHour)).label;

    this._label.innerText = time.toString();
    this._label.style.gridRowStart = startLabel;
    this._label.style.gridRowEnd = endLabel;
    this._line.style.gridRow = startLabel;
  }

  public hide(): void {
    this._label.hidden = true;
    this._line.hidden = true;
  }

  public show(): void {
    this._label.hidden = false;
    this._line.hidden = false;
  }

  public set time(time: Time) {
    this.dataset["time"] = time.toString();
  }

  public get time(): Time {
    return Time.parse(this.dataset["time"]);
  }
}

customElements.define(TimetableRow.elementName, TimetableRow);
