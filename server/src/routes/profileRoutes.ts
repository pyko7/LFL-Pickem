import { Router } from "express";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { deleteUser } from "../controllers/users/deleteUser";
import { getUserById } from "../controllers/users/getUserById";
import { createCsrf } from "../middleware/createCsrfToken";
import { verifyUser } from "../middleware/verifyUser";

export const profileRoutes = Router();

profileRoutes.get("/", createCsrf, getUserById);
profileRoutes.post("/reset-password", verifyUser, sendResetPasswordEmail);
profileRoutes.delete("/delete", verifyUser, deleteUser);

