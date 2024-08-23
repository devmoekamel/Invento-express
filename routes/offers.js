import { Router } from "express";
import { acceptOffer, addOffer, getAllOffers, getUserOffers,  } from "../controllers/offer.js";
import { Authentication } from "../middleware/Authentication.js";

const router = Router();

router.use(Authentication);
router.route("/").post(addOffer);
router.route("/accept").post(acceptOffer);
router.route("/all").get(getAllOffers);
router.route("/me").get(getUserOffers);
// router.route("/:id").put().delete();

export default router;
