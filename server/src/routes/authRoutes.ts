import { Router } from "express";
import { createSessionCookie } from "../controllers/auth/createSessionCookie";
import { createUser } from "../controllers/auth/createUser";
import { resendVerificationEmail } from "../controllers/auth/resendVerificationEmail";

export const authRoutes = Router();
authRoutes.post("/signup", createUser);
authRoutes.post("/sessionLogin", createSessionCookie);
authRoutes.post("/confirm-email", resendVerificationEmail);
