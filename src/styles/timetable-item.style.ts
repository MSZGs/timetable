import { css } from "lit";

export const style = css`
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

export default style;
