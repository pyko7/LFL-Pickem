import { Router } from "express";
import { getAllDays } from "../controllers/teams/getAllDays";
import { getAllTeams } from "../controllers/teams/getAllTeams";
import { getGamesByDay } from "../controllers/teams/getGamesByDay";
import { verifySession } from "../middleware/verifySession";

export const teamRoutes = Router();

teamRoutes.get("/all", verifySession, getAllTeams);
teamRoutes.get("/game/:id", verifySession, getGamesByDay);
teamRoutes.get("/games", verifySession, getAllDays)
