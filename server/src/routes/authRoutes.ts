import { Router } from "express";
import { createUser } from "../controllers/createUser";

export const authRoutes = Router();
authRoutes.post("/signup", createUser);
