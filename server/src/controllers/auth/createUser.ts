import { Request, Response } from "express";
import { auth } from "../../firebase";
import { createUserSchema } from "../../validations/userValidation";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const pseudo = user.pseudo.toLowerCase();
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
      displayName: pseudo,
      disabled: false,
    });

    const verificationEmail = await auth.generateEmailVerificationLink(
      user.email
    );
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: user.email,
      },
      `${process.env.JWT_SECRET_KEY}`
    );
    sendVerificationEmail(user.email, verificationEmail);

    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "lax",
    });
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
