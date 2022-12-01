import { Request, Response } from "express";
import { auth } from "../../firebase";

export const createSessionCookie = async (req: Request, res: Response) => {
  const idToken = req.body.idToken;
  const expiresIn = 3600;

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      // secure: true,
    });
    res.end(JSON.stringify({ status: "success" }));
  } catch (error) {
    res.status(401).json(error);
  }
};
