import ScrollableDaysTabs from "@/src/components/Navigation/ScrollableDaysTabs";
import GameContainer from "@/src/components/Containers/GameContainer";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { DayProps, Game } from "@/src/types/types";
import { capitalizeFirstLetter } from "@/src/utils/capitalizeFirstLetter";
import { useState } from "react";
import { getGamesByDayId } from "@/src/utils/api/game/getGamesByDayId";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/utils/api/user/getUserById";
import { useAuthContext } from "@/context/AuthContext";
import Skeleton from "../Loaders/Skeleton";

type Props = {
  days: DayProps[];
  day: DayProps;
  games: Game[];
};

const League = ({ days, day, games }: Props) => {
  const { isLogged } = useAuthContext();
  const [dayData, setDayData] = useState(day);
  const [gamesByDay, setGamesByDay] = useState(games);
  const emptyCards = Array(5).fill(0);
  const date = capitalizeFirstLetter(
    format(parseISO(dayData.date.toString()), "PPPP", {
      locale: fr,
    })
  );

  const { data, isLoading, isError, refetch } = useQuery(
    ["user"],
    getUserById,
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
      enabled: isLogged,
    }
  );

  const fetchGames = async (id: number) => {
    const games = await getGamesByDayId(id);
    setGamesByDay(games);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 flex flex-col items-center justify-between">
      <ScrollableDaysTabs
        schedule={days}
        dayData={dayData}
        setDayData={setDayData}
        fetchGames={fetchGames}
      />
      <div className="w-full px-3 md:px-5">
        <h1 className="mt-20 mb-10 text-lg font-bold lg:max-w-md lg:text-xl">
          {date}
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-5 md:justify-start">
          {isError ? (
            <p className="block text-xl my-20 mx-auto">
              Une erreur est survenue lors du chargement des matchs
            </p>
          ) : null}
          {isLogged && isLoading ? (
            emptyCards.map((c, i) => {
              return (
                <Skeleton className="w-full max-w-sm h-56" rounded key={i} aria-label="Chargement des matchs" />
              );
            })
          ) : (
            <>
              {gamesByDay.map((currentDay) => {
                return (
                  <GameContainer
                    day={currentDay}
                    bets={data?.bets}
                    handleRefetch={handleRefetch}
                    key={currentDay.id}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default League;
