import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { verifySession } from "./middleware/verifySession";
import { gameRoutes } from "./routes/gameRoutes";
import {
  doubleCsrfProtection,
  generateCsrfToken,
} from "./middleware/csrfProtection";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: `${process.env.CLIENT_URL}` }));
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "same-site",
    },
  })
);
app.use(cookieParser());
app.get("/api/csrf-token", generateCsrfToken);
app.use(doubleCsrfProtection);
// app.use("/api/auth", authRoutes);
// app.use("/api/user", verifySession, userRoutes);
// app.use("/api/game", gameRoutes);
app.listen(process.env.PORT, () => {
  console.log("listening at " + port);
});
