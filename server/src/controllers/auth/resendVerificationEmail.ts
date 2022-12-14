import { Request, Response } from "express";
import { auth } from "../../firebase";
import { sendVerificationEmail } from "./sendVerificationEmail";
import dotenv from "dotenv";
dotenv.config();

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const verificationEmail = await auth.generateEmailVerificationLink(email);
    sendVerificationEmail(email, verificationEmail);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
     return res.status(400).json(error);
  }
};
