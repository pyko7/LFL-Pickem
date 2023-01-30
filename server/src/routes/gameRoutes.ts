import { Router } from "express";
import { addSelectedTeams } from "../controllers/game/addSelectedTeams";
import { deleteSelectedTeams } from "../controllers/game/deleteSelectedTeams";
import { getAllDays } from "../controllers/game/getAllDays";
import { getAllTeams } from "../controllers/game/getAllTeams";
import { getDayByDate } from "../controllers/game/getDayByDate";
import { getGamesByDay } from "../controllers/game/getGamesByDay";
import { getSelectedTeams } from "../controllers/game/getSelectedTeams";
import { updateSelectedTeams } from "../controllers/game/updateSelectedTeams";
import { betLimiter } from "../middleware/betLimiter";
import { verifyDate } from "../middleware/verifyDate";

export const gameRoutes = Router();

gameRoutes.get("/teams", getAllTeams);
gameRoutes.get("/days", getAllDays);
gameRoutes.get("/days/:id", getGamesByDay);
gameRoutes.get("/day/:date", getDayByDate);
gameRoutes.get("/selected", getSelectedTeams);

gameRoutes.post("/selected", betLimiter, verifyDate, addSelectedTeams);
gameRoutes.put("/selected", betLimiter, verifyDate, updateSelectedTeams);
gameRoutes.delete("/selected", betLimiter, verifyDate, deleteSelectedTeams);
