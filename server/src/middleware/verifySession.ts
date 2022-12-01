import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase";

export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionCookie = req.cookies.session || "";
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      throw new Error("User must be logged in");
    }
    next();
  } catch (error) {
    res.redirect("/login");
    return res.status(403).json(error);
  }
};
