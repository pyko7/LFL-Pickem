import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { DayList, TeamList } from "./teams";

export type ContextProps = {
  children: ReactNode;
};

export interface AuthContextInterface {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

export interface GameContextInterface {
  schedule: UseQueryResult<DayList, unknown>;
  dayId: number | undefined;
  setDayId: (dayId: number | undefined) => void;
  days: DayList | undefined;
  setDays: (days: DayList | undefined) => void;
  teams: TeamList | undefined;
}
