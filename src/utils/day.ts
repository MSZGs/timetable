export type Day = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export function dayToId(day: Day): number {
  switch (day) {
    case "MON":
      return 0;
    case "TUE":
      return 1;
    case "WED":
      return 2;
    case "THU":
      return 3;
    case "FRI":
      return 4;
    case "SAT":
      return 5;
    case "SUN":
      return 6;
    default:
      return -1;
  }
}

export function parseDay(dayId: number): Day {
  switch (dayId) {
    case 0:
      return "MON";
    case 1:
      return "TUE";
    case 2:
      return "WED";
    case 3:
      return "THU";
    case 4:
      return "FRI";
    case 5:
      return "SAT";
    case 6:
      return "SUN";
    default:
      return undefined;
  }
}
