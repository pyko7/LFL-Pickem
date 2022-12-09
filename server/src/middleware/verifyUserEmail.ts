import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase";

export const verifyUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.body.idToken.toString();
  try {
    const decodedToken = await auth.verifyIdToken(idToken, true);
    if (!decodedToken.email_verified) {
      throw new Error("Email is not verified");
    }
    next();
  } catch (error) {
    return res.status(403).json(error);
  }
};
