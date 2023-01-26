import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response) => {
  const csrfToken = req.body.csrfToken.toString();

  if (csrfToken !== req.cookies["__Host-.x-csrf-token"]) {
    return res.status(401).send("UNAUTHORIZED REQUEST!");
  }
  res.clearCookie("session");
  res.clearCookie("pid");
  res.status(200).json({ message: "success" });
};
