import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session, pid } = req.cookies;
  const csrfToken = req.body.csrfToken.toString();
  const { email } = req.body;

  if (csrfToken !== req.cookies["__Host.x-csrf-token"]) {
    return res.status(401).send("UNAUTHORIZED REQUEST!");
  }

  try {
    const user = verify(pid, `${process.env.JWT_SECRET_KEY}`);
    const decodedToken = await auth.verifySessionCookie(session);

    if (typeof user === "object") {
      if (email !== decodedToken.email || user.pid !== decodedToken.uid) {
        throw Error("Forbidden access");
      }
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json(error.message);
    }
    res.status(403).json(error);
  }
};
