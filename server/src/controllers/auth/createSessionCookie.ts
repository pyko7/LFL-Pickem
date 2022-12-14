import { Request, Response } from "express";
import { auth } from "../../firebase";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createSessionCookie = async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  const expiresIn = 3600000;

  if (csrfToken !== req.cookies["__Host.x-csrf-token"]) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const token = await auth.verifyIdToken(idToken);

    const pidCookie = sign(
      { pid: token.uid },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: 360,
      }
    );

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    res.cookie("pid", pidCookie, {
      maxAge: expiresIn,
      sameSite: "lax",
      secure: true,
    });

    return res.end(JSON.stringify({ status: "success" }));
  } catch (error) {
    return res.status(401).json(error);
  }
};
