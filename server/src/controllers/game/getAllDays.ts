import { Request, Response } from "express";
import prisma from "../../prisma";

export const getAllDays = async (req: Request, res: Response) => {
  try {
    const days = await prisma.day.findMany({});
    res.status(200).json(days);
  } catch (error) {
    res.status(400).json(error);
  }
};
