import { Request, Response } from "express";
import { auth } from "../../firebase";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const verificationEmail = await auth.generatePasswordResetLink(email);
    sendVerificationEmail(email, verificationEmail);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error);
    }
    return res.status(400).json(error);
  }
};
