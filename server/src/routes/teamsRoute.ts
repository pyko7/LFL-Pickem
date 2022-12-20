import { Router } from "express";
import path from "path";
import { getAllTeams } from "../controllers/teams/getAllTeams";
import { verifySession } from "../middleware/verifySession";

export const teamRoutes = Router();

teamRoutes.get("/all", verifySession, getAllTeams);
teamRoutes.get("/schedule", verifySession, (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/json/", "days.json"));
});
