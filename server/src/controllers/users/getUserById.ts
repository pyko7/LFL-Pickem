import { Request, Response } from "express";
import { auth } from "../../firebase";

export const getUserById = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(sessionId, true);
    const user = await auth.getUser(decodedToken.uid);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
