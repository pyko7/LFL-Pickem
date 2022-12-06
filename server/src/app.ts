import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes";
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: `${process.env.CLIENT_URL}` }));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening at " + port);
});
