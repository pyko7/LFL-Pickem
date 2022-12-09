import { Router } from "express";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { getUserById } from "../controllers/users/getUserById";
import { verifyUser } from "../middleware/verifyUser";

export const profileRoutes = Router();

profileRoutes.get("/", getUserById);
profileRoutes.post("/reset-password", verifyUser, sendResetPasswordEmail);
