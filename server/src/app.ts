import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

app.listen(process.env.PORT, async () => {
  console.log("listening at " + port);
});
