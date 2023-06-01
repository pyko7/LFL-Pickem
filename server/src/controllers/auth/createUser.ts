import { Request, Response } from "express";
import { auth } from "../../firebase";
import { createUserSchema } from "../../validations/userValidation";
import prisma from "../../prisma";
import { sendEmail } from "../../utils/users/email/sendEmail";
import { generateConfirmEmailTemplate } from "../../utils/users/email/generateConfirmEmailTemplate";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const pseudo = user.pseudo.toLowerCase();
  const subject = "Confirmer votre adresse email";
  try {
    res.status(400);
    await createUserSchema.validate(user);

    const results = await auth.listUsers();
    results.users.forEach((existingUser) => {
      if (existingUser.displayName === user.pseudo) {
        throw new Error("Le pseudo est déjà utilisé");
      }
    });

    const newUser = await auth.createUser({
      email: user.email,
      emailVerified: false,
      password: user.password,
      displayName: pseudo,
      disabled: false,
    });

    await prisma.user.create({
      data: {
        id: newUser.uid,
        email: newUser.email!,
        userName: newUser.displayName!,
      },
    });

    const verificationLink = await auth.generateEmailVerificationLink(
      user.email
    );
    const htmlContent = generateConfirmEmailTemplate(verificationLink);

    sendEmail(subject, user.email, verificationLink, htmlContent);

    res.status(201).json({ message: "User created!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
};
