import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const getGamesByDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const day = await prisma.game.findMany({
      where: {
        dayId: parseInt(id),
      },
    });

    res.status(200).json(day);
  } catch (error) {
    res.status(400).json(error);
  }
};
