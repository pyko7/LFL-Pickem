import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Day, GamesWithBet, TeamList } from "./teams";

export interface ContextProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

export interface GameContextInterface {
  allDays: UseQueryResult<Day[]>;
  teamsList: UseQueryResult<TeamList>;
  gamesWithBet: UseQueryResult<GamesWithBet>;
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
}
