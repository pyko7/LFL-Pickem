import { Router } from "express";
import { sendResetPasswordEmail } from "../controllers/auth/sendResetPasswordEmail";
import { deleteUser } from "../controllers/users/deleteUser";
import { getUserById } from "../controllers/users/getUserById";
import { getUserRank } from "../controllers/users/getUserRank";
import { updateUserScore } from "../controllers/users/updateUserScore";
import { verifyUser } from "../middleware/verifyUser";

export const userRoutes = Router();

userRoutes.get("/", getUserById);
userRoutes.get("/rank", getUserRank);
userRoutes.post("/reset-password", verifyUser, sendResetPasswordEmail);
userRoutes.put("/score", updateUserScore);
userRoutes.delete("/delete", verifyUser, deleteUser);
