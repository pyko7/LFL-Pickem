import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { utcToZonedTime } from "date-fns-tz";

export const verifyDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId, dayId } = req.body;

  //date-fns-tz has 1 hour off compare to Paris timezone, this is why timezone is set to Kiev (UTC+02:00)
  const dateInFrance = utcToZonedTime(new Date(), "Europe/Kiev");

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        id: dayId,
      },
    });

    if (!game || !day) {
      throw new Error("No game found");
    }

    const gameDate = game.date.getTime();
    const dayDate = day.date.getTime();

    if (gameDate < dateInFrance.getTime() || dayDate < dateInFrance.getTime()) {
      throw new Error("Unauthorized action");
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json(error.message);
    }
    return res.status(401).json(error);
  }
};
