import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";
import { dayCredentials } from "../../validations/betValidation";

export const getGamesWithBetByDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await dayCredentials.validate({ dayId: parseInt(id) });

    const sessionCookie = req.cookies.session;
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    const userId = decodedToken.uid;

    const day = await prisma.game.findMany({
      where: {
        dayId: parseInt(id),
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        bets: true,
      },
    });

    if (!user) {
      throw new Error("unauthorized request");
    }

    const userBets = user.bets.filter((bet) => bet.dayId === parseInt(id));

    const gamesWithBet = {
      day,
      userBets,
    };

    res.status(200).json(gamesWithBet);
  } catch (error) {
    res.status(400).json(error);
  }
};
