import { PrismaUser } from "../../types/prisma";
import { UserRank } from "../../types/user";

export const getUserRankById = (
  allUsers: PrismaUser[],
  currentUser: PrismaUser
): UserRank | number => {
  let userRank = 0;

  const ranking = allUsers.sort((a, b) => {
    return b.points - a.points || a.id.localeCompare(b.id);
  });

  const isUserRanked = ranking.find((user) => user.id === currentUser.id);

  if (!isUserRanked) {
    return (userRank = ranking.length);
  }

  userRank = ranking.indexOf(isUserRanked) + 1;

  const userTopPercentile = (userRank / ranking.length) * 100;

  return {
    userRank,
    top: userTopPercentile,
    ranking: ranking.length,
  };
};
