import { Router } from "express";
import { getAllDays } from "../controllers/game/getAllDays";
import { getAllTeams } from "../controllers/game/getAllTeams";
import { getGamesByDay } from "../controllers/game/getGamesByDay";
import { verifySession } from "../middleware/verifySession";

export const gameRoutes = Router();

gameRoutes.get("/teams", verifySession, getAllTeams);
gameRoutes.get("/days", verifySession, getAllDays);
gameRoutes.get("/days/:id", verifySession, getGamesByDay);
