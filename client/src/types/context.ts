import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Day, Game, TeamList } from "./teams";
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
  teams: TeamList | null;
  day: Game[] | null;
  setDay: (day: Game[] | null) => void;
  dayData: Day | null;
  setDayData: (dayData: Day | null) => void;
}
