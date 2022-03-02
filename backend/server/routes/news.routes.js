import express from "express";
import authJwt from "../middlewares";
import newCtrl from "../controllers/news.controller";

const router = express.Router();

router.route("/news").post(newCtrl.create)
router.route("/news").get(newCtrl.get)
router.route("/news/:id").get(newCtrl.getOne)
router.route("/news/:id").put(newCtrl.put)
router.route("/news/:id").delete(newCtrl.delete)

export default router;

