import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.session;
  const { email } = req.body;
  try {
    const decodedToken = await auth.verifySessionCookie(token, true);
    if (email !== decodedToken.email) {
      throw new Error("Unauthorized request!");
    }
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
