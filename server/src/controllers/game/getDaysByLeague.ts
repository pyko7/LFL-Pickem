import { Request, Response } from "express";
import prisma from "../../prisma";

export const getDaysByLeague = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const days = await prisma.day.findMany({
      where: {
        games: {
          every: {
            leagueId: parseInt(id),
          },
        },
      },
    });
    res.status(200).json(days);
  } catch (error) {
    res.status(400).json(error);
  }
};
