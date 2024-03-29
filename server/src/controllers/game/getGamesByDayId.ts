import { Request, Response } from "express";
import prisma from "../../prisma";
import { dayCredentials } from "../../validations/betValidation";

export const getGamesByDayId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await dayCredentials.validate({ dayId: parseInt(id) });

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
