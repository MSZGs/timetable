(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["timetable"] = factory();
	else
		root["timetable"] = factory();
})(((a) => {if(a.mszgs === undefined) a.mszgs = {}; return a.mszgs})(this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Timetable": () => (/* reexport */ Timetable),
  "TimetableItem": () => (/* reexport */ TimetableItem),
  "TimetableRow": () => (/* reexport */ TimetableRow)
});

;// CONCATENATED MODULE: ./build/utils/template.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Template {
  constructor(templateHtmlString) {
    _defineProperty(this, "_template", void 0);

    _defineProperty(this, "_templateHtmlString", void 0);

    this._templateHtmlString = templateHtmlString;
    this._template = document.createElement("template");
    this._template.innerHTML = templateHtmlString;
  }

  addStyle(styleString) {
    const style = document.createElement("style");
    style.innerHTML = styleString;
    this.template.appendChild(style);
  }

  get templateHtmlString() {
    return this._templateHtmlString;
  }

  get template() {
    return this._template;
  }

  clone(deep = true) {
    return this._template.content.cloneNode(deep);
  }

}
/* harmony default export */ const template = (Template);
;// CONCATENATED MODULE: ./build/utils/column-data.js
function column_data_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ColumnData {
  constructor(row, start = 0, denominator = 1, span = 1) {
    column_data_defineProperty(this, "_row", void 0);

    column_data_defineProperty(this, "_start", void 0);

    column_data_defineProperty(this, "_span", void 0);

    column_data_defineProperty(this, "_denominator", void 0);

    this._row = row;
    this._start = start;
    this._denominator = denominator;
    this._span = span;
  }

  get row() {
    return this._row;
  }

  get start() {
    return this._start;
  }

  get span() {
    return this._span;
  }

  get denominator() {
    return this._span;
  }

  toString() {
    return `${this._row}/${this._start}/${this._denominator}/${this._span}`;
  }

  static parse(data) {
    const [row, start, denominator, span] = data.split("/").map(x => parseInt(x));
    return new ColumnData(row, start, denominator, span);
  }

}
;// CONCATENATED MODULE: ./build/utils/day.js
function dayToId(day) {
  switch (day) {
    case "MON":
      return 1;

    case "TUE":
      return 2;

    case "WED":
      return 3;

    case "THU":
      return 4;

    case "FRI":
      return 5;

    case "SAT":
      return 6;

    case "SUN":
      return 7;

    default:
      return -1;
  }
}
function parseDay(dayId) {
  switch (dayId) {
    case 1:
      return "MON";

    case 2:
      return "TUE";

    case 3:
      return "WED";

    case 4:
      return "THU";

    case 5:
      return "FRI";

    case 6:
      return "SAT";

    case 7:
      return "SUN";

    default:
      return undefined;
  }
}
;// CONCATENATED MODULE: ./build/utils/grid-column-label.js
function grid_column_label_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GridColumnLabel {
  constructor(row, numerator = 0, denominator = 1) {
    grid_column_label_defineProperty(this, "_numerator", void 0);

    grid_column_label_defineProperty(this, "_denominator", void 0);

    grid_column_label_defineProperty(this, "_row", void 0);

    const gcd = this._gcd(numerator, denominator);

    this._numerator = numerator / gcd;
    this._denominator = denominator / gcd;
    this._row = row;
  }

  _gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);

    while (y > 0) {
      const t = y;
      y = x % y;
      x = t;
    }

    return x;
  }

  get label() {
    if (this._numerator === 0) {
      return `c${this._row}`;
    } else if (this._numerator === this._denominator) {
      return `c${this._row + 1}`;
    } else {
      return `c${this._row}-${this._numerator}I${this._denominator}`;
    }
  }

  get value() {
    return this._numerator / this._denominator;
  }

  get absoluteValue() {
    return this._row + this.value;
  }

  static compare(l1, l2) {
    return l1.absoluteValue - l2.absoluteValue;
  }

  static equals(l1, l2) {
    return GridColumnLabel.compare(l1, l2) === 0;
  }

}
;// CONCATENATED MODULE: ./build/utils/grid-row-label.js
function grid_row_label_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GridRowLabel {
  constructor(time) {
    grid_row_label_defineProperty(this, "_time", void 0);

    this._time = time;
  }

  get label() {
    return `r${this._time.hour}-${this._time.min}`;
  }

}
;// CONCATENATED MODULE: ./build/utils/time.js
function time_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Time {
  constructor(hour, min) {
    time_defineProperty(this, "_hour", void 0);

    time_defineProperty(this, "_min", void 0);

    this._min = min % 60;
    this._hour = hour + Math.floor(min / 60);
  }

  get hour() {
    return this._hour;
  }

  get min() {
    return this._min;
  }

  get absoluteValue() {
    return this.hour + this.min / 60;
  }

  toString() {
    return `${this.hour > 9 ? "" : "0"}${this.hour}:${this.min > 9 ? "" : "0"}${this.min}`;
  }

  static fromAbsoluteValue(value) {
    const hour = Math.trunc(value);
    const min = Math.round((value - hour) * 60);
    return new Time(hour, min);
  }

  static parse(timeString) {
    if (timeString === undefined) {
      return new Time(0, 0);
    }

    const [h, m] = timeString.split(":").map(x => parseInt(x));
    return new Time(h, m);
  }

  isBefore(t2) {
    return Time.compare(this, t2) < 1;
  }

  isAfter(t2) {
    return Time.compare(this, t2) > 1;
  }

  add(t2) {
    return new Time(this._hour + t2._hour, this._min + t2._min);
  }

  floor() {
    return new Time(this._hour, 0);
  }

  ceil() {
    return new Time(this._min > 0 ? this._hour + 1 : this._hour, 0);
  }

  subtract(t2) {
    const min = this._min - t2._min;
    const hour = this._hour - t2._hour;

    if (min < 0) {
      return new Time(hour - 1, min + 60);
    }

    return new Time(hour, min);
  }

  static compare(t1, t2) {
    const a = t1._hour - t2._hour;
    return a !== 0 ? a : t1._min - t2._min;
  }

  static equals(t1, t2) {
    return Time.compare(t1, t2) === 0;
  }

  static *range(start, end, step = Time.OneHour) {
    let x = start;

    while (Time.compare(x, end) < 1) {
      yield x;
      x = x.add(step);
    }
  }

}

time_defineProperty(Time, "OneHour", new Time(1, 0));

time_defineProperty(Time, "OneMinute", new Time(0, 1));

class TimeSpan {
  constructor(start, end) {
    time_defineProperty(this, "_start", void 0);

    time_defineProperty(this, "_end", void 0);

    this._start = start;
    this._end = end;
  }

  isIntersect(other) {
    return this._start.isBefore(other._end) && this._end.isAfter(other._start);
  }

  range(step = Time.OneHour) {
    return Time.range(this._start, this._end, step);
  }

}
;// CONCATENATED MODULE: ./build/timetable-item.js
function timetable_item_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var templateHtml = "<style>\r\n  :host {\r\n    display: contents;\r\n  }\r\n\r\n  .panel {\r\n    font-size: 14px;\r\n    overflow: hidden;\r\n    text-align: left;\r\n    height: 100%;\r\n\r\n    background-color: #222 ;\r\n    border: 2px solid #337ab7;\r\n    border-radius: 4px;\r\n    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\r\n    box-sizing: border-box;\r\n    color: #EEE;\r\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n    line-height: 1.42857143;\r\n    scrollbar-color: #333 #666;\r\n  }\r\n\r\n  .panel-heading {\r\n    background-color: #337ab7;\r\n    border-bottom: 1px solid #337ab7;\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n  }\r\n\r\n  .panel-body {\r\n    padding: 7.5px;\r\n  }\r\n</style>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-heading\">\r\n    <span id=\"title\"> </span>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n      <slot></slot>\r\n    </span>\r\n  </div>\r\n</div>\r\n";
const timetable_item_template = new template(templateHtml);
class TimetableItem extends HTMLElement {
  static get observedAttributes() {
    return ["data-time-start", "data-time-end", "data-day", "data-title"];
  }

  constructor(data = {}) {
    super();

    timetable_item_defineProperty(this, "_panel", void 0);

    timetable_item_defineProperty(this, "_columnData", void 0);

    timetable_item_defineProperty(this, "_title", void 0);

    this.attachShadow({
      mode: "open"
    }).appendChild(timetable_item_template.clone());
    this._columnData = new ColumnData(0);
    this._panel = this.shadowRoot.querySelector(".panel");
    this._title = this.shadowRoot.querySelector("span#title");
    Object.keys(data).forEach(x => this.dataset[x] = data[x]);
  }

  attributeChangedCallback(name, oldVal, newVal) {
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

  updateGridColumn() {
    this._panel.style.gridColumnStart = new GridColumnLabel(dayToId(this.day), this.column.start, this.column.denominator).label;
    this._panel.style.gridColumnEnd = new GridColumnLabel(dayToId(this.day), this.column.start + this.column.span, this.column.denominator).label;
  }

  updateGridRow() {
    this._panel.style.gridRowStart = new GridRowLabel(this.timeStart).label;
    this._panel.style.gridRowEnd = new GridRowLabel(this.timeEnd).label;
  }

  update() {
    this.updateGridColumn();
    this.updateGridRow();
  }

  get column() {
    return this._columnData;
  }

  set column(n) {
    this._columnData = n;
    this.updateGridColumn();
  }

  get timeStart() {
    return Time.parse(this.dataset["timeStart"]);
  }

  set timeStart(time) {
    this.dataset["timeStart"] = time.toString();
  }

  get timeEnd() {
    return Time.parse(this.dataset["timeEnd"]);
  }

  set timeEnd(time) {
    this.dataset["timeEnd"] = time.toString();
  }

  get time() {
    return new TimeSpan(this.timeStart, this.timeEnd);
  }

  get day() {
    return this.dataset["day"];
  }

  set day(day) {
    this.dataset["day"] = day;
  }

  get title() {
    return this.dataset["title"];
  }

  set title(title) {
    this.dataset["title"] = title;
  }

}

timetable_item_defineProperty(TimetableItem, "elementName", "mszgs-timetable-item");

customElements.define(TimetableItem.elementName, TimetableItem);
;// CONCATENATED MODULE: ./build/utils/grid-template-builders.js
function grid_template_builders_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class GridTemplateRowBuilder {
  constructor(data = []) {
    grid_template_builders_defineProperty(this, "_data", void 0);

    grid_template_builders_defineProperty(this, "_css", void 0);

    grid_template_builders_defineProperty(this, "_minTime", void 0);

    grid_template_builders_defineProperty(this, "_maxTime", void 0);

    grid_template_builders_defineProperty(this, "_calculated", void 0);

    this._data = data;
    this._calculated = false;
  }

  _build() {
    const values = this._data.map(x => x.absoluteValue);

    this._minTime = Time.fromAbsoluteValue(Math.min(...values)).floor();
    this._maxTime = Time.fromAbsoluteValue(Math.max(...values)).ceil();

    this._data.push(...Time.range(this._minTime, this._maxTime));

    const data = this._data.sort(Time.compare);

    const css = ["[header] 50px"];

    for (let index = 0; index < data.length - 1; index++) {
      const current = data[index];
      const next = data[index + 1];

      if (Time.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      const label = new GridRowLabel(current);
      css.push(`[${label.label}] ${value}fr`);
    }

    css.push("[end]");
    this._css = css.join(" ");
    this._calculated = true;
  }

  buildIfNot() {
    if (!this._calculated) {
      this._build();
    }
  }

  addTime(time) {
    this._data.push(time);

    this._calculated = false;
  }

  minTime() {
    this.buildIfNot();
    return this._minTime;
  }

  maxTime() {
    this.buildIfNot();
    return this._maxTime;
  }

  build() {
    this.buildIfNot();
    return this._css;
  }

}
class GridTemplateColumnsBuilder {
  constructor(data = []) {
    grid_template_builders_defineProperty(this, "_data", void 0);

    this._data = data;
  }

  addColumn(data = [1]) {
    this._data.push(data);
  }

  build() {
    const data = this._data;
    const css = ["[start] 64px"];
    const labels = [];

    for (let i = 0; i < data.length; i++) {
      data[i].forEach(x => {
        for (let k = 0; k < x; k++) {
          labels.push(new GridColumnLabel(i, k, x));
        }
      });
    }

    const sortedLabels = labels.sort(GridColumnLabel.compare);

    for (let i = 0; i < sortedLabels.length - 1; i++) {
      const current = sortedLabels[i];
      const next = sortedLabels[i + 1];

      if (GridColumnLabel.equals(current, next)) {
        continue;
      }

      const value = next.absoluteValue - current.absoluteValue;
      css.push(`[${current.label}] ${value}fr`);
    }

    css.push(`[${new GridColumnLabel(data.length - 1).label}] 0fr [end]`);
    return css.join(" ");
  }

}
;// CONCATENATED MODULE: ./build/timetable-row.js
function timetable_row_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var templateString = "<style>\r\n    :host{\r\n        display: contents;\r\n    }\r\n\r\n    #line {\r\n    border-top: 1px #fff solid;\r\n    grid-column: start / end;\r\n    z-index: -1;\r\n    }\r\n    #label{\r\n        grid-column: 1\r\n    }\r\n</style>\r\n\r\n<div id=\"line\"></div>\r\n<div id=\"label\"></div>";


class TimetableRow extends HTMLElement {
  static get observedAttributes() {
    return ["data-time"];
  }

  constructor(time) {
    super();

    timetable_row_defineProperty(this, "_line", void 0);

    timetable_row_defineProperty(this, "_label", void 0);

    this.attachShadow({
      mode: "open"
    }).appendChild(TimetableRow.template.clone());
    this._label = this.shadowRoot.getElementById("label");
    this._line = this.shadowRoot.getElementById("line");

    if (time !== undefined) {
      this.time = time;
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === null) {
      return;
    }

    if (name === "data-time") {
      this.update();
    }
  }

  update() {
    const time = this.time;
    const startLabel = new GridRowLabel(time).label;
    const endLabel = new GridRowLabel(time.add(Time.OneHour)).label;
    this._label.innerText = time.toString();
    this._label.style.gridRowStart = startLabel;
    this._label.style.gridRowEnd = endLabel;
    this._line.style.gridRow = startLabel;
  }

  hide() {
    this._label.hidden = true;
    this._line.hidden = true;
  }

  show() {
    this._label.hidden = false;
    this._line.hidden = false;
  }

  set time(time) {
    this.dataset["time"] = time.toString();
  }

  get time() {
    return Time.parse(this.dataset["time"]);
  }

}

timetable_row_defineProperty(TimetableRow, "elementName", "mszgs-timetable-row");

timetable_row_defineProperty(TimetableRow, "template", new template(templateString));

customElements.define(TimetableRow.elementName, TimetableRow);
;// CONCATENATED MODULE: ./build/timetable.js
function timetable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var timetable_templateHtml = "<style>\r\n  /*\r\n  Props:\r\n  --mszgs-timetable-header-label-monday\r\n  --mszgs-timetable-header-label-tuesday\r\n  --mszgs-timetable-header-label-wednesday\r\n  --mszgs-timetable-header-label-thursday\r\n  --mszgs-timetable-header-label-friday\r\n  --mszgs-timetable-header-label-saturday\r\n  --mszgs-timetable-header-label-sunday\r\n\r\n  --mszgs-timetable-min-width\r\n  */\r\n  .monday {\r\n    grid-row: header;\r\n    grid-column: c0 / c1;\r\n  }\r\n\r\n  .monday::after {\r\n    content: var(--mszgs-timetable-header-label-monday, \"Monday\");\r\n  }\r\n\r\n  .tuesday {\r\n    grid-row: header;\r\n    grid-column: c1 / c2;\r\n  }\r\n\r\n  .tuesday::after {\r\n    content: var(--mszgs-timetable-header-label-tuesday, \"Tuesday\");\r\n  }\r\n\r\n  .wednesday {\r\n    grid-row: header;\r\n    grid-column: c2 / c3;\r\n  }\r\n\r\n  .wednesday::after {\r\n    content: var(--mszgs-timetable-header-label-wednesday, \"Wednesday\");\r\n  }\r\n\r\n  .thursday {\r\n    grid-row: header;\r\n    grid-column: c3 / c4;\r\n  }\r\n\r\n  .thursday::after {\r\n    content: var(--mszgs-timetable-header-label-thursday, \"Thursday\");\r\n  }\r\n\r\n  .friday {\r\n    grid-row: header;\r\n    grid-column: c4 / c5;\r\n  }\r\n\r\n  .friday::after {\r\n    content: var(--mszgs-timetable-header-label-friday, \"Friday\");\r\n  }\r\n\r\n  .saturday {\r\n    grid-row: header;\r\n    grid-column: c5 / c6;\r\n  }\r\n\r\n  .saturday::after {\r\n    content: var(--mszgs-timetable-header-label-saturday, \"Saturday\");\r\n  }\r\n\r\n  .sunday {\r\n    grid-row: header;\r\n    grid-column: c6 / c7;\r\n  }\r\n\r\n  .sunday::after {\r\n    content: var(--mszgs-timetable-header-label-sunday, \"Sunday\");\r\n  }\r\n\r\n  .grid {\r\n    display: grid;\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n    background-color: #222;\r\n    color: #eee;\r\n    min-width: var(--mszgs-timetable-min-width, 550px);\r\n    transition: all 1s;\r\n    z-index: 0;\r\n  }\r\n\r\n  div {\r\n    text-align: center;\r\n    position: relative;\r\n  }\r\n\r\n  .contents {\r\n    display: contents;\r\n  }\r\n\r\n  .overflow {\r\n    overflow-x: auto;\r\n  }\r\n\r\n  .grid-line {\r\n    border-top: 1px #fff solid;\r\n    grid-column: start / end;\r\n    z-index: -1;\r\n  }\r\n</style>\r\n<div class=\"overflow\">\r\n  <div class=\"grid\">\r\n    <div id=\"header\" class=\"contents\">\r\n      <div id=\"monday\"    class=\"header monday\"></div>\r\n      <div id=\"tuesday\"   class=\"header tuesday\"></div>\r\n      <div id=\"wednesday\" class=\"header wednesday\"></div>\r\n      <div id=\"thursday\"  class=\"header thursday\"></div>\r\n      <div id=\"friday\"    class=\"header friday\"></div>\r\n      <div id=\"saturday\"  class=\"header saturday\"></div>\r\n      <div id=\"sunday\"    class=\"header sunday\"></div>\r\n    </div>\r\n    <div id=\"timeline\" class=\"contents\">\r\n    </div>\r\n    <div id=\"items\" class=\"contents\">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</div>\r\n";







const timetable_template = new template(timetable_templateHtml);

class IntersectCalculator {
  constructor(arr) {
    timetable_defineProperty(this, "_arr", void 0);

    this._arr = arr;
  }

  isIntersect(t1, t2) {
    return t1.time.isIntersect(t2.time);
  }

  calc() {
    const data = this._arr;
    const graph = new Array(data.length);
    data.forEach((item, index, array) => {
      const int = [];
      array.forEach((other, i) => {
        if (item !== other && this.isIntersect(item, other)) {
          int.push(i);
        }
      });
      graph[index] = int;
    }); //  console.log(graph);

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

class Timetable extends HTMLElement {
  static get observedAttributes() {
    return ["data-from", "data-to"];
  }

  constructor() {
    super();

    timetable_defineProperty(this, "_changeObserver", void 0);

    timetable_defineProperty(this, "_grid", void 0);

    timetable_defineProperty(this, "_timeline", void 0);

    timetable_defineProperty(this, "_rows", void 0);

    this.attachShadow({
      mode: "open"
    }).appendChild(timetable_template.clone());
    this._grid = this.shadowRoot.querySelector(".grid");
    this._timeline = this.shadowRoot.querySelector("#timeline");
    this._rows = new Map();
    this._changeObserver = new MutationObserver(this.update.bind(this));

    this._changeObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ["data-time-start", "data-time-end", "data-day"],
      subtree: true
    });
  }

  add(data) {
    this.appendChild(new TimetableItem(data));
  }

  update() {
    this.updateTemplateColumns();
    this.updateTemplateRows();
  }

  updateTemplateColumns() {
    const builder = new GridTemplateColumnsBuilder();

    for (let i = 0; i <= this.days; i++) {
      const items = this.items.filter(x => x.day === parseDay(i)).sort((a, b) => {
        return Time.compare(a.timeStart, b.timeStart);
      });

      if (items.length === 0) {
        builder.addColumn([1]);
        continue;
      }

      new IntersectCalculator(items).calc();
      const map = new Map();

      for (const item of items) {
        const set = new Set();

        for (const otherItem of items) {
          if (
          /* item !== otherItem && */
          item.time.isIntersect(otherItem.time)) {
            set.add(otherItem);
          }
        }

        map.set(item, set);
      }

      const config = new Map();

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

  updateTemplateRows() {
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

  updateRows(from, to) {
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

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === null) {
      return;
    }

    if (name === "data-days") {
      this.updateTemplateColumns();
    } else if (name === "data-from" || name === "data-to") {
      this.updateTemplateRows();
    }
  }

  get from() {
    const from = this.dataset["from"];

    if (from !== undefined) {
      return Time.parse(from);
    }

    return undefined;
  }

  get to() {
    const to = this.dataset["to"];

    if (to !== undefined) {
      return Time.parse(this.dataset["to"]);
    }

    return undefined;
  }

  get days() {
    return 7; // parseInt(this.dataset["days"]);
  }

  get items() {
    return Array.from(this.querySelectorAll(TimetableItem.elementName));
  }

}

timetable_defineProperty(Timetable, "elementName", "mszgs-timetable");

customElements.define(Timetable.elementName, Timetable);
;// CONCATENATED MODULE: ./build/index.js



/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=mszgs.timetable.js.map