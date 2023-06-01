import { Request, Response } from "express";
import prisma from "../../prisma";

export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Wrong ID");
    }
    const team = await prisma.team.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json(error);
  }
};
