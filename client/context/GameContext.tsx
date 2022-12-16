import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { ContextProps, GameContextInterface } from "~/src/types/context";
import { DayList, TeamList } from "~/src/types/teams";
import { getAllTeams } from "~/src/utils/api/teams/getAllTeams";
import { getSchedule } from "~/src/utils/api/teams/getSchedule";

const GameContext = createContext({} as GameContextInterface);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: ContextProps) => {
  const [dayId, setDayId] = useState<number | undefined>();
  const [days, setDays] = useState<DayList>();
  const [teams, setTeams] = useState<TeamList>();

  const schedule = useQuery(["schedule"], getSchedule);
  const teamsList = useQuery(["teams"], getAllTeams);

  useEffect(() => {
    if (typeof teamsList.data !== "undefined") {
      setTeams(teamsList.data);
    }
  }, [teamsList]);

  return (
    <GameContext.Provider
      value={{
        schedule,
        dayId,
        setDayId,
        days,
        setDays,
        teams,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
