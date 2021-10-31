# Timetable

![npm (scoped)](https://img.shields.io/npm/v/@mszgs/timetable?style=flat-square)
![GitHub](https://img.shields.io/github/license/MSZGs/timetable?style=flat-square)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/@mszgs/timetable?style=flat-square)

Responsive timetable element.

## Installation

Load from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@mszgs/timetable"></script>
```

Install via `npm`:

```bash
npm install @mszgs/timetable
```

## Usage

```html
<mszgs-timetable>
  <mszgs-timetable-item data-title="Subject 1" data-time-start="10:20" data-time-end="12:00" data-day="MON"
    >...</mszgs-timetable-item
  >
  <mszgs-timetable-item data-title="Subject 3" data-time-start="14:00" data-time-end="20:00" data-day="WED"
    >...</mszgs-timetable-item
  >
  <mszgs-timetable-item data-title="Subject 2" data-time-start="10:00" data-time-end="12:00" data-day="TUE"
    >...</mszgs-timetable-item
  >
  <mszgs-timetable-item data-title="Subject 4" data-time-start="15:00" data-time-end="16:40" data-day="THU"
    >...</mszgs-timetable-item
  >
  ...
</mszgs-timetable>
```

```javascript
import { Timetable, TimetableItem } from "@mszgs/timetable";

const timetable = new Timetable();
document.body.appendChild(timetable);

const subject = new TimetableItem({
  day: "MON",
  timeStart: "08:00",
  timeEnd: "10:00",
  title: "subjectTitle",
});

timetable.appendChild(subject);
```

## Customization

### Locals

```html
<link href="https://cdn.jsdelivr.net/npm/@mszgs/timetable/locales/[language].css" rel="stylesheet" />
```

Currently supported languages:

- English
- Hungarian
- German

### Style

Custom CSS properties:

- --mszgs-timetable-background
- --mszgs-timetable-border-color
- --mszgs-timetable-color
- --mszgs-timetable-font-family
- --mszgs-timetable-header-background
- --mszgs-timetable-item-border-radius
- --mszgs-timetable-item-primary-color
- --mszgs-timetable-min-width

## License

Distributed under the MIT license. See LICENSE for details.
