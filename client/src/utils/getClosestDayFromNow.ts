import { Day } from "../types/teams";
import moment from "moment";

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

  validDates = array.filter((day) => moment(day.date).isAfter());

  if (validDates.length === 0) {
    return (date = array.pop()?.date);
  }
  validDates.forEach((day) => {
    const diff = Math.abs(moment().diff(day.date, "minutes", true));
    times.push(diff);
    console.log(times);
    const closestDate = Math.min(...times);
    date = moment()
      .add(closestDate, "minutes")
      .toDate()
      .setUTCHours(0, 0, 0, 0);
    date = new Date(date).toISOString();
  });
  return date;
};
