import { Request, Response } from "express";
import { auth } from "../../firebase";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const resendVerificationEmail = async (req: Request, res: Response) => {
  if (!req.cookies.auth) {
    return res.status(401).json("Unauthorized request");
  }

  try {
    const decodedToken = verify(
      req.cookies.auth,
      `${process.env.JWT_SECRET_KEY}`
    );
    if (decodedToken && typeof decodedToken === "object") {
      const verificationEmail = await auth.generateEmailVerificationLink(
        decodedToken.data
      );
      sendVerificationEmail(decodedToken.data, verificationEmail);
    }
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error);
    }
    return res.status(400).json(error);
  }
};
