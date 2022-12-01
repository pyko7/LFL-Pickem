import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening at " + port);
});
