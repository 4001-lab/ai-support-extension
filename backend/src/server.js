import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateReply from "./routes/generateReply.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-reply", generateReply);

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
