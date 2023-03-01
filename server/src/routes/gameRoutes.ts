import { Router } from "express";
import { addSelectedTeams } from "../controllers/game/addSelectedTeams";
import { deleteSelectedTeams } from "../controllers/game/deleteSelectedTeams";
import { getAllDays } from "../controllers/game/getAllDays";
import { getAllTeams } from "../controllers/game/getAllTeams";
import { getGamesByDayId } from "../controllers/game/getGamesByDayId";
import { getGamesWithBetByDay } from "../controllers/game/getGamesWithBetByDay";
import { updateSelectedTeams } from "../controllers/game/updateSelectedTeams";
import { betLimiter } from "../middleware/betLimiter";
import { verifyDate } from "../middleware/verifyDate";
import { verifySession } from "../middleware/verifySession";

export const gameRoutes = Router();

gameRoutes.get("/teams", getAllTeams);
gameRoutes.get("/days", getAllDays);
gameRoutes.get("/days/:id", verifySession, getGamesWithBetByDay);
gameRoutes.get("/day/:id", getGamesByDayId);


gameRoutes.post("/selected",verifySession, betLimiter,  verifyDate, addSelectedTeams);
gameRoutes.put("/selected",verifySession, betLimiter,  verifyDate, updateSelectedTeams);
gameRoutes.delete("/selected",verifySession, betLimiter,  verifyDate, deleteSelectedTeams);
