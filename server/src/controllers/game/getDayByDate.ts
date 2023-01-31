import { Request, Response } from "express";
import prisma from "../../prisma";
import { dateCredentials } from "../../validations/betValidation";

export const getDayByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    await dateCredentials.validate({ date });

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
