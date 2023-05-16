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

export type Day = {
  id: number;
  date: string;
  dayId: number;
  firstTeamId: number;
  secondTeamId: number;
  winner: number;
};
