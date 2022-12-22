import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase";

export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionCookie = req.cookies.session;
  try {
    await auth.verifySessionCookie(sessionCookie);
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};
