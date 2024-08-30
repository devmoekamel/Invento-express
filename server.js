import { config, configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import users from "./routes/users.js";
import stock from "./routes/stock.js";
import offers from "./routes/offers.js";
import transaction from "./routes/transaction.js";
import cors from "cors";

const app = express();

const env = config({
  path: "./config/config.env",
});
app.use(
  cors({
    origin: "https://invento-webapp.vercel.app/",
    // origin: process.env.Front_END_URL,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/stock", stock);
app.use("/api/v1/offers", offers);
app.use("/api/v1/transactions", transaction);
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  try {
    connectDB();
    console.log("server running on port 5000");
  } catch (e) {
    process.exit(1);
  }
});
