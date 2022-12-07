import { Request, Response } from "express";
import { auth } from "../../firebase";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const sendResetPasswordEmail = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACTEMAIL,
      pass: process.env.CONTACTPASSWORD,
    },
  });
  try {
    const link = await auth.generatePasswordResetLink(email);

    const data = {
      from: "LFL-Pickem <noreply@lflpickem.com>",
      to: email,
      subject: "Réinitialisez votre mot de passe",
      text: `Réinitialisation du mot de passe: cliquez sur le lien pour réinitialiser votre mot de passe: ${link}`,
      html: `
      <p>
      Bonjour, 
      
      <br/><br/>
      
      Vous avez fait une demande de réinitialisation de mot passe. Cliquez sur ce lien pour réinitialiser votre mot de passe:
      
      <br/><br/>
      
      <a href="${link}"> Réinitialiser mon mot de passe</a>
      
      <br/><br/>
      
      Si vous n'avez pas demandé à réinitialiser votre mot de passe, vous pouvez ignorer cet e-mail.
      
      <br/><br/>
            
      Merci,
       <br/>
      <h2 style="font-size: 1.1em">La team LFL-Pickem</h2>      
    `,
    };
    transporter.sendMail(data);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    res.status(400).json(error);
  }
};
