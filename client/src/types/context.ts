import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Day, Game, TeamList, UserSelection } from "./teams";
import { User } from "./user";

export type ContextProps = {
  children: ReactNode;
};

export interface AuthContextInterface {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  user: UseQueryResult<User> | null;
  setUser: (user: UseQueryResult<User> | null) => void;
}

export interface GameContextInterface {
  allDays: UseQueryResult<Day[]>;
  selectedTeamsList: UseQueryResult<UserSelection[]>;
  teams: TeamList | null;
  day: Game[] | null;
  setDay: (day: Game[] | null) => void;
  dayData: Day;
  setDayData: (dayData: Day) => void;
  userSelection: UserSelection[];
}
