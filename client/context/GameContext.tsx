import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { GameContextInterface } from "@/src/types/context";
import { Day } from "@/src/types/teams";
import { getAllDays } from "@/src/utils/api/game/getAllDays";
import { getAllTeams } from "@/src/utils/api/game/getAllTeams";
import { getGamesWithBetByDay } from "@/src/utils/api/game/getGamesWithBeByDay";
import { getClosestDayFromNow } from "@/src/utils/getClosestDayFromNow";
import { updateUserScore } from "@/src/utils/api/user/updateUserScore";

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: any) => {
  const [dayData, setDayData] = useState<Day | null>(null);

  const allDays = useQuery(["allDays"], getAllDays, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });
  const teamsList = useQuery(["teams"], getAllTeams, {
    staleTime: 30 * (60 * 1000), // 30 mins
    cacheTime: 45 * (60 * 1000), // 45 mins
  });

  const gamesWithBet = useQuery(
    ["gamesWithBet"],
    () => getGamesWithBetByDay(dayData?.id!),
    {
      enabled: dayData !== null ? true : false,
    }
  );

  useEffect(() => {
    if (typeof allDays.data !== "undefined") {
      const getClosestDay = async () => {
        const date = getClosestDayFromNow(allDays.data);
        allDays.data.map((day: Day) => {
          if (new Date(day.date).toDateString() == date) {
            return setDayData(day);
          }
        });
      };
      getClosestDay();
    }
  }, [allDays.data]);

  useEffect(() => {
    if (dayData === null) {
      allDays.refetch();
      return;
    }
    gamesWithBet.refetch();
  }, [dayData?.id]);

  useEffect(() => {
    updateUserScore();
  }, []);

  return (
    <GameContext.Provider
      value={{
        allDays,
        teamsList,
        gamesWithBet,
        dayData,
        setDayData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
