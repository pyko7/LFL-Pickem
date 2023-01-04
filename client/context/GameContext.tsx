import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, GameContextInterface } from "~/src/types/context";
import { TeamList, Game, Day } from "~/src/types/teams";
import { getAllDays } from "~/src/utils/api/game/getAllDays";
import { getAllTeams } from "~/src/utils/api/game/getAllTeams";
import { getDayByDate } from "~/src/utils/api/game/getDayByDate";
import { getGamesByDay } from "~/src/utils/api/game/getGamesByDay";
import { getSelectedTeams } from "~/src/utils/api/game/getSelectedTeams";
import { getClosestDayFromNow } from "~/src/utils/getClosestDayFromNow";

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: ContextProps) => {
  const [teams, setTeams] = useState<TeamList | null>(null);
  const [dayData, setDayData] = useState<Day | null>(null);
  const [day, setDay] = useState<Game[] | null>(null);

  const allDays = useQuery(["allDays"], getAllDays);
  const teamsList = useQuery(["teams"], getAllTeams);
  const selectedTeamsList = useQuery(["selectedTeams"], getSelectedTeams);

  useEffect(() => {
    if (typeof allDays.data !== "undefined") {
      const getClosestDay = async () => {
        const date = getClosestDayFromNow(allDays.data);
        const closestDay = await getDayByDate(date);
        setDayData(closestDay);
      };
      getClosestDay();
    }
  }, [allDays.data]);

  useEffect(() => {
    if (typeof teamsList.data !== "undefined") {
      setTeams(teamsList.data);
    }
  }, [teamsList]);

  useEffect(() => {
    if (dayData === null) {
      return;
    }
    const setGames = async () => {
      const games = await getGamesByDay(dayData?.id);
      setDay(games);
    };
    setGames();
  }, [dayData?.id]);

  return (
    <GameContext.Provider
      value={{
        allDays,
        selectedTeamsList,
        teams,
        day,
        setDay,
        dayData,
        setDayData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
