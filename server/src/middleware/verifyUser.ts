import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase";
import dotenv from "dotenv";
import { userCredentials } from "../validations/userValidation";
import { jwtVerify } from "jose";
dotenv.config();

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session, pid } = req.cookies;
  const { user } = req.body;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  try {
    await userCredentials.validate(user.email);
    const { payload } = await jwtVerify(pid, secret);
    const decodedToken = await auth.verifySessionCookie(session);

    if (user.email !== decodedToken.email || payload.pid !== decodedToken.uid) {
      throw Error("Forbidden access");
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json(error.message);
    }
    res.status(403).json(error);
  }
};
