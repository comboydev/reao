import express from "express";
import coinCtrl from "../controllers/coin.controller";

const router = express.Router();

router.route("/api/admin/coins/create").post(coinCtrl.create);
router.route("/api/admin/coins/:id/get").get(coinCtrl.getOne);
router.route("/api/admin/coins/:id/update").put(coinCtrl.update);
router.route("/api/admin/coins/bulkDelete").post(coinCtrl.bulkDelete);

router.route("/api/user/coins/:id/get").get(coinCtrl.getOne)


export default router;