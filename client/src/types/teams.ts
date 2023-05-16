import { Game, Team } from "./types";

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

export interface TeamCardContainer {
  game: Game;
  firstTeam: Team;
  secondTeam: Team;
  selectedTeam: number;
  disabledDay: boolean;
  notSelected: number;
  noBet: boolean;
  handleClick: (currentTeamId: number, otherTeamId: number) => void;
}

export interface DayId {
  dayId: number;
  setDayId: (dayId: number) => void;
}

export interface SelectedTeam {
  gameId: number;
  teamId: number;
  dayId: number;
}

export interface UserSelection extends SelectedTeam {
  id: number;
  userId: string;
}

export interface GamesWithBet {
  day: Game[];
  userBets: UserSelection[];
}
