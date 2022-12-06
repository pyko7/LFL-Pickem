import { Request, Response } from "express";
import { auth } from "../../firebase";
import { createUserSchema } from "../../validations/userValidation";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    await createUserSchema.validate(user);

    const results = await auth.listUsers();
    results.users.forEach((existingUser) => {
      if (existingUser.displayName === user.pseudo) {
        throw new Error("Le pseudo est déjà utilisé");
      }
    });

    await auth.createUser({
      email: user.email,
      emailVerified: false,
      password: user.password,
      displayName: user.pseudo,
      disabled: false,
    });

    const verificationEmail = await auth.generateEmailVerificationLink(
      user.email
    );
    sendVerificationEmail(user.email, verificationEmail);

    res.status(201).json({ message: "User created!" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Le pseudo est déjà utilisé") {
        return res.status(400).json(JSON.stringify(error.message));
      }
      return res.status(400).json(error);
    }
  }
};
