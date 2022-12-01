import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACTEMAIL,
      pass: process.env.CONTACTPASSWORD,
    },
  });
  const data = {
    from: "LFL-Pickem <noreply@lflpickem.com>",
    to: email,
    subject: "Vérification de l'email",
    text: `Vérification de l'email: cliquez sur le lien pour la vérification de votre adresse mail: ${link}`,
    html: `
    <h1 style="font-size: 1.5em">Bienvenue dans LFL-Pickem !</h1>
    <p>Afin de pouvoir continuer sur le site je t'invite à cliquer sur le lien ci-dessous afin de vérifier ton adresse mail <br/><br/><br/>
      <a href="${link}"> Lien d'activation</a>
      <br/>
      <br/>
      <br/>
      <h2 style="font-size: 1.1em">La team LFL-Pickem</h2>
    </p>
    `,
  };
  transporter.sendMail(data);
};
