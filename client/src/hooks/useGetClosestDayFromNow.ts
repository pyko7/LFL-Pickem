import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getClosestDayFromNow } from "../utils/getClosestDayFromNow";
import { Day } from "../types/teams";

export const useGetClosestDayFromNow = (array: UseQueryResult<Day[]>) => {
  const [closestDay, setClosestDay] = useState<Day | null>(null);

  useEffect(() => {
    if (typeof array.data === "undefined") {
      return;
    }
    const getClosestDay = () => {
      const date = getClosestDayFromNow(array.data);
      array.data.map((day: Day) => {
        if (new Date(day.date).toDateString() == date) {
          return setClosestDay(day);
        }
      });
    };
    getClosestDay();
  }, [array.data]);
  return { closestDay };
};
