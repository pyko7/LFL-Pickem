import { Router } from "express";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { deleteUser } from "../controllers/users/deleteUser";
import { getUserById } from "../controllers/users/getUserById";
import { createCsrf } from "../middleware/createCsrfToken";
import { verifyUser } from "../middleware/verifyUser";

export const userRoutes = Router();

userRoutes.get("/token", createCsrf);
userRoutes.get("/", getUserById);
userRoutes.post("/reset-password", verifyUser, sendResetPasswordEmail);
userRoutes.delete("/delete", verifyUser, deleteUser);
