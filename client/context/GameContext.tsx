import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, GameContextInterface } from "~/src/types/context";
import { Game, Day, UserSelection } from "~/src/types/teams";
import { getUserScore } from "~/src/utils/api/user/getUserScore";
import { getAllDays } from "~/src/utils/api/game/getAllDays";
import { getAllTeams } from "~/src/utils/api/game/getAllTeams";
import { getGamesByDay } from "~/src/utils/api/game/getGamesByDay";
import { getSelectedTeams } from "~/src/utils/api/game/getSelectedTeams";
import { getClosestDayFromNow } from "~/src/utils/getClosestDayFromNow";

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: ContextProps) => {
  const [dayData, setDayData] = useState<Day | null>(null);

  const [day, setDay] = useState<Game[] | null>(null);
  const [userSelection, setUserSelection] = useState<UserSelection[]>([]);
  const allDays = useQuery(["allDays"], getAllDays);
  const teamsList = useQuery(["teams"], getAllTeams);
  const selectedTeamsList = useQuery(["selectedTeams"], getSelectedTeams);

  useEffect(() => {
    getUserScore();
  }, []);

  useEffect(() => {
    if (typeof allDays.data !== "undefined") {
      const getClosestDay = async () => {
        const date = getClosestDayFromNow(allDays.data);
        allDays.data.map((day) => {
          if (day.date == date) {
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
    const setGames = async () => {
      const games = await getGamesByDay(dayData?.id);
      setDay(games);
    };
    setGames();
  }, [dayData?.id]);

  useEffect(() => {
    if (typeof selectedTeamsList.data !== "undefined") {
      selectedTeamsList.refetch();
      setUserSelection(selectedTeamsList.data);
    }
  }, [selectedTeamsList.data, dayData]);

  return (
    <GameContext.Provider
      value={{
        allDays,
        selectedTeamsList,
        teamsList,
        day,
        setDay,
        dayData,
        setDayData,
        userSelection,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
