import { Bet, Game } from "@prisma/client";

type BetArray = (Bet & {
  game: Game;
})[];

export const calculateScore = (bets: BetArray) => {
  const winningBets = bets.filter((bet) => bet.game.winner === bet.teamId);
  const winningBetDates = new Set(
    winningBets.map((bet) => bet.game.date.toDateString())
  );
  const uniqueDates = Array.from(new Set(winningBetDates));
  let bonusPoints = 0;
  for (const date of uniqueDates) {
    const betsOnDate = winningBets.filter(
      (bet) => bet.game.date.toDateString() === date
    );
    if (betsOnDate.length >= 5) {
      bonusPoints += 5;
    }
  }
  return winningBets.length * 3 + bonusPoints;
};
