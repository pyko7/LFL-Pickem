import { Request, Response } from "express";

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("session", {
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DOMAIN
        : process.env.ENV_DOMAIN,
  });
  res.clearCookie("pid", {
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DOMAIN
        : process.env.ENV_DOMAIN,
  });
  res.status(200).json({ message: "success" });
};
