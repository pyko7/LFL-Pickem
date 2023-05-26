import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma";
import { auth } from "../../firebase";

export const createAnonymousUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.body.idToken.toString();

  try {
    const token = await auth.verifyIdToken(idToken);
    const randomInt = Math.floor(Math.random() * 999) + 1;

    await prisma.user.create({
      data: {
        id: token.uid,
        email: `${token.uid}`,
        userName: `Picker${randomInt}`,
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
