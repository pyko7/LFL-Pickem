import { Request, Response } from "express";
import { auth } from "../../firebase";

export const createSessionCookie = async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();

  if (csrfToken !== req.cookies["__Host.x-csrf-token"]) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  const expiresIn = 3600000;
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    return res.end(JSON.stringify({ status: "success" }));
  } catch (error) {
    return res.status(401).json(error);
  }
};
