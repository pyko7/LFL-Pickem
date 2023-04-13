import { ReactNode } from "react";
import { Day } from "./teams";


export interface Tabs {
  children: ReactNode;
  position: number;
}

export interface Tab {
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  label: string;
  value: Day;
  setPosition: (position: number) => void;
}
