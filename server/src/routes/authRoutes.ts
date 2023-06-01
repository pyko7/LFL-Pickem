import { Router } from "express";
import { createSessionCookie } from "../controllers/auth/createSessionCookie";
import { createUser } from "../controllers/auth/createUser";
import { logoutUser } from "../controllers/auth/logoutUser";
import { resendVerificationEmail } from "../controllers/auth/resendVerificationEmail";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { verifyUserEmail } from "../middleware/verifyUserEmail";
import { createAnonymousUser } from "../controllers/auth/createAnonymousUser";

export const authRoutes = Router();

authRoutes.post("/signup", createUser);
authRoutes.post("/sessionLogin", verifyUserEmail, createSessionCookie);
authRoutes.post("/anonymousSession", createAnonymousUser, createSessionCookie);
authRoutes.post("/confirm-email", resendVerificationEmail);
authRoutes.post("/reset-password", sendResetPasswordEmail);
authRoutes.post("/logout", logoutUser);
