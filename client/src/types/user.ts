export interface SelectedTeamsByDay {
  dayId: number;
  teams: number[];
}

export interface GamesData {
  games: SelectedTeamsByDay[];
  points: number;
}

export interface User {
  userName: string;
  points: number;
}
