import { Day } from "../types/teams";
import moment from "moment";

export const getClosestGameFromNow = (array: Day[]) => {
  let minDiff = null;
  let mostAccurateDate = array[0];
  array.map((day) => {
    const diff = Math.abs(moment().diff(day.date, "minutes", true));
    if (diff) {
      minDiff = diff;
      mostAccurateDate = day;
    }
  });
  return mostAccurateDate;
};
