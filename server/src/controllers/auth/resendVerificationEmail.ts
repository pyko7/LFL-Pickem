import { Request, Response } from "express";
import { auth } from "../../firebase";
import dotenv from "dotenv";
import { userCredentials } from "../../validations/userValidation";
import { sendEmail } from "./sendEmail";
import { generateConfirmEmailTemplate } from "../../utils/users/email/generateConfirmEmailTemplate";
dotenv.config();

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const {user} = req.body;
  const subject = "Confirmer votre adresse email";

  try {
    await userCredentials.validate(user.email);
    const verificationLink = await auth.generateEmailVerificationLink(user.email);
    const htmlContent = generateConfirmEmailTemplate(verificationLink);
    sendEmail(subject, user.email, verificationLink, htmlContent);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
