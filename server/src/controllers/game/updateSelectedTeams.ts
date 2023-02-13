import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";
import { gameCredentials } from "../../validations/betValidation";

export const updateSelectedTeams = async (req: Request, res: Response) => {
  try {
    const { gameId, teamId, dayId } = req.body;
    const sessionCookie = req.cookies.session;
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    const userId = decodedToken.uid;

    await gameCredentials.validate({ gameId, teamId, dayId });
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

    if (isBet[0].teamId === teamId) {
      throw new Error("Unauthorized request");
    }
    await prisma.bet.update({
      where: {
        id: isBet[0].id,
      },
      data: {
        teamId: teamId,
      },
    });

    res.status(200).json({ message: "Bet modified" });
  } catch (error) {
    res.status(400).json(error);
  }
};
