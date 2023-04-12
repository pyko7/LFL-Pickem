import { Day } from "./teams";

export interface TabProps {
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  label: string;
  value: Day;
  setPosition: (position: number) => void;
}
