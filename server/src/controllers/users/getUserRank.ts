import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";
import { getUserRankById } from "../../utils/users/getUserRankById";
export const getUserRank = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;

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

    const user = getUserRankById(allUsers, currentUser);

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
