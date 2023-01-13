import { Router } from "express";
import { createSessionCookie } from "../controllers/auth/createSessionCookie";
import { createUser } from "../controllers/auth/createUser";
import { logoutUser } from "../controllers/auth/logoutUser";
import { resendVerificationEmail } from "../controllers/auth/resendVerificationEmail";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { createCsrf } from "../middleware/createCsrfToken";
import { verifyUserEmail } from "../middleware/verifyUserEmail";

export const authRoutes = Router();

authRoutes.get("/csrf", createCsrf);
authRoutes.post("/signup", createUser);
authRoutes.post("/sessionLogin", verifyUserEmail, createSessionCookie);
authRoutes.post("/confirm-email", resendVerificationEmail);
authRoutes.post("/reset-password", sendResetPasswordEmail);
authRoutes.post("/logout", logoutUser);
