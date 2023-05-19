import { Request, Response } from "express";
import { auth } from "../../firebase";
import * as dotenv from "dotenv";
import { userCredentials } from "../../validations/userValidation";
import { genererateResetPasswordEmailTemplate } from "../../utils/users/email/generateResetPasswordEmailTemplate";
import { sendEmail } from "./sendEmail";
dotenv.config();

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    await userCredentials.validate(user.email);
    const verificationLink = await auth.generatePasswordResetLink(user.email);
    const subject = "Réinitialisation votre mot de passe";
    const htmlContent = genererateResetPasswordEmailTemplate(verificationLink);
    sendEmail(subject, user.email, verificationLink, htmlContent);

    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    res.status(400).json(error);
  }
};
