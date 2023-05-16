import { Router } from "express";
import { addSelectedTeams } from "../controllers/game/addSelectedTeams";
import { deleteSelectedTeams } from "../controllers/game/deleteSelectedTeams";
import { getDaysByLeague } from "../controllers/game/getDaysByLeague";
import { getTeamsByLeague } from "../controllers/game/getTeamsByLeague";
import { getGamesByDayId } from "../controllers/game/getGamesByDayId";
import { getGamesWithBetByDay } from "../controllers/game/getGamesWithBetByDay";
import { updateSelectedTeams } from "../controllers/game/updateSelectedTeams";
import { betLimiter } from "../middleware/betLimiter";
import { verifyDate } from "../middleware/verifyDate";
import { verifySession } from "../middleware/verifySession";
import { getAllDays } from "../controllers/game/getAllDays";
import { getTeamById } from "../controllers/game/getTeamById";

export const gameRoutes = Router();

gameRoutes.get("/team/:id", getTeamById);
gameRoutes.get("/teams/:id", getTeamsByLeague);
gameRoutes.get("/days", getAllDays);
gameRoutes.get("/days/:id", getDaysByLeague);
gameRoutes.get("/days/bet/:id", verifySession, getGamesWithBetByDay);
gameRoutes.get("/day/:id", getGamesByDayId);


gameRoutes.post("/selected",verifySession, betLimiter,  verifyDate, addSelectedTeams);
gameRoutes.put("/selected",verifySession, betLimiter,  verifyDate, updateSelectedTeams);
gameRoutes.delete("/selected",verifySession, betLimiter,  verifyDate, deleteSelectedTeams);
