import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma";
import { auth } from "../../firebase";
import { generateUsername } from "../../utils/users/generateUsername";

export const createAnonymousUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.body.idToken.toString();

  try {
    const token = await auth.verifyIdToken(idToken);
    const userName = await generateUsername();

    await prisma.user.create({
      data: {
        id: token.uid,
        email: `${token.uid}`,
        userName,
      },
    });

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
};
