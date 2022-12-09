import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("session");
  res.end();
};
