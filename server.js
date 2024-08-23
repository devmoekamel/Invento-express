import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import users from "./routes/users.js";
import stock from "./routes/stock.js";
import offers from "./routes/offers.js";
import transaction from "./routes/transaction.js";
const app = express();

const env = configDotenv({
  path: "./config/config.env",
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/stock", stock);
app.use("/api/v1/offers",offers );
app.use("/api/v1/transactions",transaction);



app.listen(3000, () => {
  try {
    connectDB();
    console.log("server running on port 3000");
  } catch (e) {
    process.exit(1);
  }
});
