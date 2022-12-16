export type TeamList = {
  teams: Team[];
};

export interface TeamLineup {
  top: string;
  jungle: string;
  mid: string;
  adc: string;
  support: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  lineup: TeamLineup;
}

export type DayList = {
  days: Day[];
};

export interface Day {
  id: number;
  date: string;
  games: Game[];
}

export interface Game {
  id: number;
  time: string;
  firstTeamId: number;
  secondTeamId: number;
}

export interface DayId {
  dayId: number;
  setDayId: (dayId: number) => void;
}
