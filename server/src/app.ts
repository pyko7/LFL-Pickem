import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { verifySession } from "./middleware/verifySession";
import { teamRoutes } from "./routes/teamsRoute";

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

app.use(express.static(path.join(__dirname, "assets/images/logos")));
app.use("/api/auth", authRoutes);
app.use("/api/user", verifySession, userRoutes);
app.use("/api/team", verifySession, teamRoutes);
app.listen(process.env.PORT, () => {
  console.log("listening at " + port);
});
