import { Request, Response } from "express";
import { auth } from "../../firebase";
import * as jose from "jose";
import dotenv from "dotenv";
dotenv.config();

export const createSessionCookie = async (req: Request, res: Response) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 3600000;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const alg = process.env.JWT_ALG;

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const token = await auth.verifyIdToken(idToken);

    const pidCookie = await new jose.SignJWT({ pid: token.uid })
      .setProtectedHeader({ alg: alg! })
      .setExpirationTime("1h")
      .sign(secret);

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_DOMAIN
          : process.env.ENV_DOMAIN,
    });
    res.cookie("pid", pidCookie, {
      maxAge: expiresIn,
      sameSite: "lax",
      secure: true,
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_DOMAIN
          : process.env.ENV_DOMAIN,
    });

    return res.end(JSON.stringify({ status: "success" }));
  } catch (error) {
    return res.status(401).json(error);
  }
};
