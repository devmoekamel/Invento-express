import { Router } from "express";
import { getUserTransactions } from "../controllers/transaction.js";
import { Authentication } from "../middleware/Authentication.js";

const router = Router();

router.use(Authentication);

router.route("/").get(getUserTransactions);

export default router;
