import express from "express";
import imageCtrl from "../controllers/image.controller";
const router = express.Router();

router.route("/api/image/store").post(imageCtrl.store);

export default router;