import { Request, Response } from "express";
import prisma from "../../prisma";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        points: true,
      },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
