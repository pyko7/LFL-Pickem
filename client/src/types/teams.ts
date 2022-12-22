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
  color: string;
}

export interface Day {
  id: number;
  date: string;
}

export interface Game {
  id: number;
  date: string;
  dayId: number;
  firstTeamId: number;
  secondTeamId: number;
  winner: number;
}

export interface DayId {
  dayId: number;
  setDayId: (dayId: number) => void;
}
