import { UserLeaderboard } from "../types/types";

export const getUserRanking = (
  allUsers: UserLeaderboard[],
  userId: string | undefined
): number => {
  let userRank = 0;

  const ranking = allUsers.sort((a, b) => {
    return b.points - a.points;
  });

  const isUserRanked = ranking.find((user) => user.id === userId);

  if (!isUserRanked) {
    return ranking.length;
  }

  userRank = ranking.indexOf(isUserRanked) + 1;

  return userRank;
};
