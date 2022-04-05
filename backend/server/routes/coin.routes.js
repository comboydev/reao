import express from "express";
import authJwt from "../middlewares";
import coinCtrl from "../controllers/coin.controller";

const router = express.Router();

router.route("/api/admin/coins/create").post(coinCtrl.create)

router.route("/api/admin/coins/get").get(coinCtrl.getAllCoins)
router.route("/api/admin/coins/get/:id").get(coinCtrl.getCoinOne)
router.route("/api/admin/coins/delete").post(coinCtrl.deleteCoins);

router.route("/api/user/coins/get").get(coinCtrl.getAllCoins)
router.route("/api/user/coins/get/:id").get(coinCtrl.getCoinOne)


export default router;

