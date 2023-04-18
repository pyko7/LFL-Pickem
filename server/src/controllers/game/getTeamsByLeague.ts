import { Request, Response } from "express";
import prisma from "../../prisma";
import { Team } from "@prisma/client";

export const getTeamsByLeague = async (req: Request, res: Response) => {
  const { id } = req.params;
  let teams: Team[] = [];
  try {
    if (!id) {
      teams = await prisma.team.findMany({});
    } else {
      teams = await prisma.team.findMany({
        where: {
          leagueId: parseInt(id),
        },
      });
    }

    res.status(200).json({ teams });
  } catch (error) {
    res.status(400).json(error);
  }
};
