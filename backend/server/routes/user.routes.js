import express from "express";
import verifyToken from "../middlewares";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/user/personal-info/:id").get(userCtrl.get)
router.route("/api/user/update/personal-info").put(userCtrl.update)
router.route("/api/user/update/nickname").put(userCtrl.updateNickname)
router.route("/api/user/update/avatar").put(userCtrl.updateUserAvatar)
router.route("/api/user/update/warrant").put(userCtrl.updateUserWarrant)

export default router;