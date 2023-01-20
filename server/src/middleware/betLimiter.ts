import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const betLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: (req: Request, res: Response) => {
    res.status(429).json({
      error:
        "Vous avez effectuer trop de requête, veuillez patienter avant quelques instants avant de pouvoir refaire un choix",
    });
  },
});
