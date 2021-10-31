import { css } from "lit";

export const style = css`
  :host {
    --mszgs-timetable-background-default: #222;
    --mszgs-timetable-header-background-default: var(--mszgs-timetable-background-default);
    --mszgs-timetable-color-default: #faf7ff;
    --mszgs-timetable-border-color-default: #faf7ff;
    --mszgs-timetable-item-primary-color-default: #337ab7;
    --mszgs-timetable-item-border-radius-default: 5px;
    --mszgs-timetable-min-width-default: 1000px;
    --mszgs-timetable-font-family-default: "Helvetica Neue", Helvetica, Arial, sans-serif;

    font-family: var(--mszgs-timetable-font-family, var(--mszgs-timetable-font-family-default));
    overflow: auto;
    max-height: 100vh;
    max-width: 100vw;
    position: relative;
    display: block;
  }

  @media (prefers-color-scheme: light) {
    :host {
      --mszgs-timetable-background-default: #faf7ff;
      --mszgs-timetable-header-background-default: var(--mszgs-timetable-background-default);
      --mszgs-timetable-color-default: black;
      --mszgs-timetable-border-color-default: black;
      --mszgs-timetable-item-primary-color-default: #337ab7;
    }
  }

  .header {
    grid-row: header;
    position: sticky;
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header.mon::after {
    content: var(--mszgs-timetable-header-label-monday, "Monday");
  }

  .header.tue::after {
    content: var(--mszgs-timetable-header-label-tuesday, "Tuesday");
  }

  .header.wed::after {
    content: var(--mszgs-timetable-header-label-wednesday, "Wednesday");
  }

  .header.thu::after {
    content: var(--mszgs-timetable-header-label-thursday, "Thursday");
  }

  .header.fri::after {
    content: var(--mszgs-timetable-header-label-friday, "Friday");
  }

  .header.sat::after {
    content: var(--mszgs-timetable-header-label-saturday, "Saturday");
  }

  .header.sun::after {
    content: var(--mszgs-timetable-header-label-sunday, "Sunday");
  }

  .grid {
    display: grid;
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--mszgs-timetable-background, var(--mszgs-timetable-background-default));
    color: var(--mszgs-timetable-color, var(--mszgs-timetable-color-default));
    min-width: var(--mszgs-timetable-min-width, var(--mszgs-timetable-min-width-default));
    z-index: 0;
  }

  div {
    text-align: center;
    position: relative;
  }

  .contents {
    display: contents;
  }

  .grid-line {
    border-top: 2px solid;
    border-color: var(--mszgs-timetable-border-color, var(--mszgs-timetable-border-color-default));
    grid-column: start / end;
    z-index: -1;
  }

  #header {
    background: var(--mszgs-timetable-header-background, var(--mszgs-timetable-header-background-default));
    border-bottom: 2px solid;
    border-color: var(--mszgs-timetable-border-color, var(--mszgs-timetable-border-color-default));
    grid-column: start/end;
    width: 100%;
    height: 100%;
  }

  .line {
    border-top: 2px solid;
    border-color: var(--mszgs-timetable-border-color, var(--mszgs-timetable-border-color-default));
    grid-column: start / end;
    z-index: -1;
  }
  .line-label {
    border-top: 2px solid;
    border-right: 2px solid;
    border-color: var(--mszgs-timetable-border-color, var(--mszgs-timetable-border-color-default));

    grid-column: 1;
    padding-top: 5px;
    position: sticky;
    left: 0;
    background: var(--mszgs-timetable-header-background, var(--mszgs-timetable-header-background-default));
  }
`;

export default style;
