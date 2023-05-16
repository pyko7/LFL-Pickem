import { isAfter, isSameDay } from "date-fns";
import { closestTo } from "date-fns";
import { DayProps } from "../types/types";
/**
 * This function allows to display the closest when the user arrives on the homepage
 * With the closest day found we can fetch the games of this day
 * @param array This is the list of days with their ids& dates
 * @returns The closest day from today present in the games list
 */
export const getClosestDayFromNow = (array: DayProps[]): DayProps => {
  let validDates: DayProps[] = [];
  let dayDates: Date[] = [];
  let date: any = "";

  validDates = array.filter((day) => isAfter(new Date(day.date), new Date()));
  validDates.forEach((day) => {
    dayDates.push(new Date(day.date));
  });

  if (validDates.length === 0) {
    return array.slice(-1)[0];
  }

  const closestDate = closestTo(new Date(), dayDates);
  if (!closestDate) {
    return array[0];
  }

  const day = array.find((day) => isSameDay(new Date(day.date), closestDate));
  if (!day) {
    return array[0];
  }
  return day;
};
