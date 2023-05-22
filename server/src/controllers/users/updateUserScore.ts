import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";
import { calculateScore } from "../../utils/users/score/calculateScore";

export const updateUserScore = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(sessionId);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.uid,
      },
      include: { bets: { include: { game: true } } },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const { bets, points } = user;
    const updatedPoints = calculateScore(bets);

    if (updatedPoints > points) {
      await prisma.user.update({
        where: {
          id: decodedToken.uid,
        },
        data: {
          points: updatedPoints,
        },
      });
    }

    res.status(200).json({ message: "Score updated" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
