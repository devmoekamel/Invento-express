import { Router } from "express";
import { getUserTransactions } from "../controllers/transaction.js";

const router =  Router();


router.route("/").get(getUserTransactions);



export default router ; 