import { doubleCsrf } from "csrf-csrf";
import { Request, Response } from "express";

const { generateToken } = doubleCsrf({
  getSecret: () => `${process.env.SECRET_SESSION}`,
  cookieName: "__Host-.x-csrf-token",
  cookieOptions: {
    // httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

export const createCsrf = async (req: Request, res: Response) => {
  const csrfToken = generateToken(res, req);
  console.log(csrfToken);
  res.json({ csrfToken });
};
