import { Request, Response } from "express";
import { auth } from "../../firebase";
import { prisma } from "../../prisma";

export const getSelectedTeams = async (req: Request, res: Response) => {
  try {
    const sessionCookie = req.cookies.session;
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    const userId = decodedToken.uid;

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

    res.status(200).json(user.bets);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json(error.message);
    }
    res.status(400).json(error);
  }
};
