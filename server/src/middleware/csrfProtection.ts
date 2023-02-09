import { doubleCsrf } from "csrf-csrf";
import { Request, Response } from "express";

export const {
  invalidCsrfTokenError,
  generateToken,
  validateRequest,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => `${process.env.CSRF_SECRET}`,
  cookieName: "__Host-.x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
  },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

export const generateCsrfToken = (req: Request, res: Response) => {
  const csrfToken = generateToken(res, req);
  res.json({ csrfToken });
};