import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase";

export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionCookie = req.cookies.session;
  try {
    const foundUser = await auth.verifySessionCookie(sessionCookie);
    if (!foundUser) {
      throw new Error("Unauthorized request");
    }
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};
