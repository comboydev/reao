import express from "express";
import coinCtrl from "../controllers/coin.controller";

const router = express.Router();

router.route("/api/admin/coins/create").post(coinCtrl.create)

router.route("/api/admin/coins/get").get(coinCtrl.getAll)
router.route("/api/admin/coins/get/:id").get(coinCtrl.getOne)
router.route("/api/admin/coins/update/:id").put(coinCtrl.update)
router.route("/api/admin/coins/bulkDelete").post(coinCtrl.bulkDelete);

router.route("/api/user/coins/get").get(coinCtrl.getAll)
router.route("/api/user/coins/get/:id").get(coinCtrl.getOne)


export default router;