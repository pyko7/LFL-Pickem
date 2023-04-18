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

export interface TeamCard {
  team: Team;
  notSelected: number;
  disabledDay: boolean;
  noBet: boolean;
  winningBet: null | boolean;
  reversed?: boolean;
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
  index?: number;
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
