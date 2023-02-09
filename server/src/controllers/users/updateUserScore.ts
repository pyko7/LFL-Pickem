import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";
import { PrismaBet, PrismaGame } from "../../types/prisma";

export const updateUserScore = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  let userScore = 0;

  try {
    const decodedToken = await auth.verifySessionCookie(sessionId);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.uid,
      },
      include: {
        bets: true,
      },
    });
    const allGames = await prisma.game.findMany();

    if (!user || !allGames) {
      throw new Error("Invalid request");
    }

    user.bets.map((bet: PrismaBet) => {
      const betGames = allGames.filter(
        (game: PrismaGame) => bet.gameId === game.id
      );
      const winnerBet = betGames.filter(
        (game: PrismaGame) => bet.teamId === game.winner
      );
      for (let i = 0; i < winnerBet.length; i++) {
        userScore = userScore + 5;
      }
    });

    if (userScore === user.points) {
      return res.status(200).json(user?.points);
    }
    await prisma.user.update({
      where: {
        id: decodedToken.uid,
      },
      data: {
        points: userScore,
      },
    });

    res.status(200).json(user?.points);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
