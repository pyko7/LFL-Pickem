import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";

export const addSelectedTeams = async (req: Request, res: Response) => {
  try {
    const { gameId, teamId } = req.body;
    const sessionCookie = req.cookies.session;
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    const userId = decodedToken.uid;

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      throw new Error("No game found");
    }

    const isBet = await prisma.bet.findMany({
      where: {
        AND: [{ gameId: game?.id }, { userId: userId }],
      },
    });

    if (isBet.length > 0) {
      throw new Error("Unauthorized request");
    }

    await prisma.bet.create({
      data: {
        userId: userId,
        gameId: game.id,
        teamId: teamId,
      },
    });

    res.status(200).json({ message: "Bet registered" });
  } catch (error) {
    res.status(400).json(error);
  }
};
