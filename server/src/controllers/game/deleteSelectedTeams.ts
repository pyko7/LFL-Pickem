import { Request, Response } from "express";
import { auth } from "../../firebase";
import  prisma  from "../../prisma";

export const deleteSelectedTeams = async (req: Request, res: Response) => {
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

    if (!isBet) {
      throw new Error("Bet is null");
    }

    if (isBet[0].teamId !== teamId) {
      throw new Error("Unauthorized request");
    }

    await prisma.bet.delete({
      where: {
        id: isBet[0].id,
      },
    });

    res.status(200).json({ message: "Selection considered" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
