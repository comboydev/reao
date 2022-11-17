import express from "express";
import verifyToken from "../middlewares";
import UserCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/user/get/personal-info").get(UserCtrl.getInfo)
router.route("/api/user/update/personal-info").put(UserCtrl.updatePersonalInfo)
router.route("/api/user/update/nickname").put(UserCtrl.updateNickname)
router.route("/api/user/update/avatar").put(UserCtrl.updateUserAvatar)
router.route("/api/user/update/warrant").put(UserCtrl.updateUserWarrant)
router.route("/api/user/update/reward-group").put(UserCtrl.updateRewardGroup)

router.route("/api/user/get/partners").get(UserCtrl.getPartners)


export default router;