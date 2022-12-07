import { Router } from "express";
import { createSessionCookie } from "../controllers/auth/createSessionCookie";
import { createUser } from "../controllers/auth/createUser";
import { resendVerificationEmail } from "../controllers/auth/resendVerificationEmail";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { doubleCsrfProtection, loginToken } from "../middleware/csrfLogin";

export const authRoutes = Router();

authRoutes.post("/signup", createUser);
authRoutes.post(
  "/sessionLogin",
  loginToken,
  doubleCsrfProtection,
  createSessionCookie
);
authRoutes.post("/confirm-email", resendVerificationEmail);
authRoutes.post("/reset-password", sendResetPasswordEmail);
