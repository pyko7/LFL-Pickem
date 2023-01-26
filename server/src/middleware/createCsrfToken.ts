import { doubleCsrf } from "csrf-csrf";
import { Request, Response } from "express";

export const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => `${process.env.SECRET_SESSION}`,
  cookieName: "__Host-.x-csrf-token",
  cookieOptions: {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

export const createCsrf = async (req: Request, res: Response) => {
  const csrfToken = generateToken(res, req);
  res.json({ csrfToken });
};
