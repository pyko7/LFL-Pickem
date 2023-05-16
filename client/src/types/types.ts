export interface AuthForm {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type League = {
  name: string;
  imageUrl: string;
};

export type DayProps = {
  id: number;
  date: Date;
  leagueId: number;
};

export type Game = {
  id: number;
  date: Date;
  dayId: number;
  firstTeamId: number;
  secondTeamId: number;
  winner: number;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
  color: string;
};
