import { Router } from "express";
import { GetStock, updateStock } from "../controllers/stock.js";
import { Authentication } from "../middleware/Authentication.js";

const router = Router();

router.use(Authentication);
router.route("/").post(GetStock).put(updateStock);
// router.route("/update").post(updateStock);

export default router;
