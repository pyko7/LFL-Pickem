import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";

export const getUserById = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(sessionId, true);
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.uid,
      },
    });

    res.status(200).json({ userName: user?.userName, points: user?.points });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
