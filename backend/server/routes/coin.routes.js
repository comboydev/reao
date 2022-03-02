import express from "express";
import authJwt from "../middlewares";
import coinCtrl from "../controllers/coin.controller";

const router = express.Router();

router.route("/coin").post(coinCtrl.create);
router.route("/coin/:id").get(coinCtrl.getOne);
router.route("/coin").get(coinCtrl.get);
router.route("/coin/:id").put(coinCtrl.put);
router.route("/coin/:id").delete(coinCtrl.delete);

export default router;

