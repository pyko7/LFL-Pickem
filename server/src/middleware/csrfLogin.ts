import { doubleCsrf } from "csrf-csrf";
import { Request, Response, NextFunction } from "express";

export const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => `${process.env.SECRET_SESSION}`,
});

export const loginToken = (req: Request, res: Response, next: NextFunction) => {
  const csrfToken = generateToken(res, req);
  res.cookie("__Host.x-csrf-token", csrfToken, {
    sameSite: "lax",
    // secure: true,
  });
  next();
};
