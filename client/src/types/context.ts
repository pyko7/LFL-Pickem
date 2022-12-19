import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { DayList, TeamList } from "./teams";
import { User } from "./user";

export type ContextProps = {
  children: ReactNode;
};

export interface AuthContextInterface {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
}

export interface GameContextInterface {
  schedule: UseQueryResult<DayList, unknown>;
  dayId: number | undefined;
  setDayId: (dayId: number | undefined) => void;
  days: DayList | undefined;
  setDays: (days: DayList | undefined) => void;
  teams: TeamList | undefined;
}
