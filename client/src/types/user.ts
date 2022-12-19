export interface GamesData {
  games: [];
  points: number;
}

export interface User {
  userName: string;
  gamesData: GamesData;
}
