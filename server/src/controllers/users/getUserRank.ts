import { Request, Response } from "express";
import { auth } from "../../firebase";
import { prisma } from "../../prisma";
export const getUserRank = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  let userRank = 0;

  try {
    const decodedToken = await auth.verifySessionCookie(sessionId);

    const allUsers = await prisma.user.findMany();
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decodedToken.uid,
      },
    });

    if (!currentUser) {
      throw new Error("Unauthorized request");
    }

    const ranking = allUsers.sort((a, b) => {
      return b.points - a.points || a.id.localeCompare(b.id);
    });

    const isUserRanked = ranking.find((user) => user.id === currentUser.id);

    if (!isUserRanked) {
      return (userRank = ranking.length - 1);
    }

    userRank = ranking.indexOf(isUserRanked) + 1;

    const userTopPercentile = (userRank / ranking.length) * 100;

    const user = {
      userRank,
      top: userTopPercentile,
      ranking: ranking.length,
    };

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
