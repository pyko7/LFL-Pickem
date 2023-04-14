import { Request, Response } from "express";
import prisma from "../../prisma";

export const getTeamsByLeague = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const teams = await prisma.team.findMany({
      where: {
        leagueId: parseInt(id),
      },
    });

    res.status(200).json({ teams });
  } catch (error) {
    res.status(400).json(error);
  }
};
