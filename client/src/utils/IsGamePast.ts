import { isBefore, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const IsGamePast = (date: Date) => {
  const dateInFrance = utcToZonedTime(new Date(), "Europe/Paris");
  //date-fns-tz has 1 hour off compare to Paris timezone, this is why timezone is set to Europe/London in France winter time and Africa/Dakar in summer
  const gameDateInFrance = utcToZonedTime(
    parseISO(date.toString()),
    "Africa/Dakar"
  );
  const isPast = isBefore(gameDateInFrance, dateInFrance);
  return isPast;
};
