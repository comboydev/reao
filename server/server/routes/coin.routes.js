import express from "express";
import coinCtrl from "../controllers/coin.controller";

const router = express.Router();

router.route("/api/coins/:id").get(coinCtrl.detail)

export default router;