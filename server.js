import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
const app = express();

const env = configDotenv({
  path: "./config/config.env",
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/users",);

app.listen(3000, () => {
  try {
    connectDB();
    console.log("server running on port 3000");
  } catch (e) {
    process.exit(1);
  }
});
