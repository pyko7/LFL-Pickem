import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();

    res.status(200).json({ teams });
  } catch (error) {
    res.status(400).json(error);
  }
};
