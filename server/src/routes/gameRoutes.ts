import { Router } from "express";
import { addSelectedTeams } from "../controllers/game/addSelectedTeams";
import { deleteSelectedTeams } from "../controllers/game/deleteSelectedTeams";
import { getAllDays } from "../controllers/game/getAllDays";
import { getAllTeams } from "../controllers/game/getAllTeams";
import { getDayByDate } from "../controllers/game/getDayByDate";
import { getGamesByDay } from "../controllers/game/getGamesByDay";
import { getSelectedTeams } from "../controllers/game/getSelectedTeams";
import { updateSelectedTeams } from "../controllers/game/updateSelectedTeams";
import { verifyDate } from "../middleware/verifyDate";
import { verifySession } from "../middleware/verifySession";

export const gameRoutes = Router();

gameRoutes.get("/teams", verifySession, getAllTeams);
gameRoutes.get("/days", verifySession, getAllDays);
gameRoutes.get("/days/:id", verifySession, getGamesByDay);
gameRoutes.get("/day/:date", verifySession, getDayByDate);
gameRoutes.get("/selected", verifySession, getSelectedTeams);

gameRoutes.post("/selected", verifySession, verifyDate, addSelectedTeams);
gameRoutes.put("/selected", verifySession, verifyDate, updateSelectedTeams);
gameRoutes.delete("/selected", verifySession, verifyDate, deleteSelectedTeams);
