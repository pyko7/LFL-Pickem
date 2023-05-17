import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import GameContainerSkeleton from "../Loaders/GameContainerSkeleton";
import { DayProps, Game } from "@/src/types/types";
import { capitalizeFirstLetter } from "@/src/utils/capitalizeFirstLetter";
import { useState } from "react";

type Props = {
  days: DayProps[];
  day: DayProps;
  games: Game[];
};

const League = ({ days, day, games }: Props) => {
  const [dayData, setDayData] = useState(day);

  const date = capitalizeFirstLetter(
    format(parseISO(day?.date.toString()), "PPPP", {
      locale: fr,
    })
  );

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 flex flex-col items-center justify-between">
      <ScrollableDaysTabs
        schedule={days}
        dayData={dayData}
        setDayData={setDayData}
      />
      <div className="w-full px-3 md:px-5">
        <h1 className="mt-20 mb-10 text-lg font-bold lg:max-w-md lg:text-xl">
          {date}
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
          {games.map((currentDay) => {
            return day?.id !== currentDay.dayId ? (
              <GameContainerSkeleton key={currentDay.id} />
            ) : (
              <GameContainer day={currentDay} key={currentDay.id} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default League;
