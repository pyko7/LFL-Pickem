import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Day, Game, GamesWithBet, TeamList, UserSelection } from "./teams";

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
  day: Game[] | null;
  setDay: (day: Game[] | null) => void;
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  userSelection: UserSelection[];
}
