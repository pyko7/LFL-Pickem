import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { auth } from "../firebase";

export const verifyUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.body.idToken.toString();
  const decodedToken = decode(idToken);

  if (!decodedToken) {
    return res.redirect("/login");
  }

  try {
    const userId = decodedToken.sub?.toString();
    const user = await auth.getUser(userId!);
    if (!user.emailVerified) {
      throw new Error("Email is not verified");
    }
    next();
  } catch (error) {
    return res.status(403).json(error);
  }
};
