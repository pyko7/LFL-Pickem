import { PrismaClientExtensionError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prisma } from "../../prisma";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();
    res.status(200).json({ teams });
  } catch (error) {
    if (error instanceof PrismaClientExtensionError) {
      res.status(400).json(error.extensionName);
    }
    res.status(400).json(error);
  }
};
