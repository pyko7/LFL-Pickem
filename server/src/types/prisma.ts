export interface PrismaUser {
  id: string;
  email: string;
  userName: string;
  points: number;
}

export interface PrismaGame {
  id: number;
  date: Date;
  winner: number;
  firstTeamId: number | null;
  secondTeamId: number | null;
  dayId: number;
}

export interface PrismaTeam {
  id: number;
  name: string;
  logo: string;
  color: string;
  Bet: PrismaBet[];
  FirstTeam: PrismaGame[];
  SecondTeam: PrismaGame[];
}

export interface PrismaDay {
  id: number;
  date: Date;
}

export interface PrismaBet {
  id: number;
  userId: string;
  gameId: number;
  teamId: number;
}
