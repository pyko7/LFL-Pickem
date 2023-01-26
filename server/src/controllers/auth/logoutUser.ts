import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("session");
  res.clearCookie("pid");
  res.status(200).json({ message: "success" });
};
