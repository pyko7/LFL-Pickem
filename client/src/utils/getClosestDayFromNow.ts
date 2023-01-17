import { Day } from "../types/teams";
import { addMilliseconds, differenceInMilliseconds, isAfter } from "date-fns";
/**
 * This function allows to display the closest when the user arrives on the homepage
 * With the closest day found we can fetch the games of this day
 * @param array This is the list of days with their ids& dates
 * @returns The closest day from today
 */
export const getClosestDayFromNow = (array: Day[]) => {
  let validDates: Day[] = [];
  let times: number[] = [];
  let date: any = "";

  validDates = array.filter((day) => isAfter(new Date(day.date), new Date()));

  if (validDates.length === 0) {
    const lastDate = array.pop()?.date;
    if (lastDate) {
      return (date = new Date(lastDate).toDateString());
    } else {
      return date;
    }
  }

  validDates.forEach((day) => {
    const diff = Math.abs(
      differenceInMilliseconds(new Date(day.date), new Date())
    );
    times.push(diff);
    const closestDateInMilliseconds = addMilliseconds(
      new Date(),
      Math.min(...times)
    );

    date = new Date(closestDateInMilliseconds).toDateString();
  });
  return date;
};
