import { Router } from "express";
import path from "path";
import { verifySession } from "../middleware/verifySession";

export const teamRoutes = Router();

teamRoutes.get("/all", verifySession, (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/json/", "teams.json"));
});
teamRoutes.get("/schedule", verifySession, (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/json/", "days.json"));
});
