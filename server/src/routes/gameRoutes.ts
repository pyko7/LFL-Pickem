import { Router } from "express";
import { addSelectedTeams } from "../controllers/game/addSelectedTeams";
import { deleteSelectedTeams } from "../controllers/game/deleteSelectedTeams";
import { getAllDays } from "../controllers/game/getAllDays";
import { getAllTeams } from "../controllers/game/getAllTeams";
import { getGamesWithBetByDay } from "../controllers/game/getGamesWithBetByDay";
import { updateSelectedTeams } from "../controllers/game/updateSelectedTeams";
import { betLimiter } from "../middleware/betLimiter";
import { verifyDate } from "../middleware/verifyDate";

export const gameRoutes = Router();

gameRoutes.get("/teams", getAllTeams);
gameRoutes.get("/days", getAllDays);
gameRoutes.get("/days/:id", getGamesWithBetByDay);


gameRoutes.post("/selected", betLimiter, verifyDate, addSelectedTeams);
gameRoutes.put("/selected", betLimiter, verifyDate, updateSelectedTeams);
gameRoutes.delete("/selected", betLimiter, verifyDate, deleteSelectedTeams);
