import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.session;
  const csrfToken = req.body.csrfToken.toString();

  if (csrfToken !== req.cookies["__Host.x-csrf-token"]) {
    return res.status(401).send("UNAUTHORIZED REQUEST!");
  }

  const { user } = req.body;
  try {
    const decodedToken = await auth.verifySessionCookie(token);
    if (user.email !== decodedToken.email) {
      throw Error("Unauthorized request: wrong email");
    }
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};
