import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const getDayByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const day = await prisma.day.findFirst({
      where: {
        date: date,
      },
    });
    res.status(200).json(day);
  } catch (error) {
    res.status(400).json(error);
  }
};
