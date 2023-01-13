import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Day, Game, TeamList, UserSelection } from "./teams";

export interface ContextProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

export interface GameContextInterface {
  allDays: UseQueryResult<Day[]>;
  selectedTeamsList: UseQueryResult<UserSelection[]>;
  teamsList: UseQueryResult<TeamList>;
  day: Game[] | null;
  setDay: (day: Game[] | null) => void;
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  userSelection: UserSelection[];
}
