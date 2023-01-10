import express from "express";
import UserCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/user/:id/get/personal-info").get(UserCtrl.getInfo)
router.route("/api/user/:id/update/personal-info").put(UserCtrl.updatePersonalInfo)
router.route("/api/user/:id/update/nickname").put(UserCtrl.updateNickname)
router.route("/api/user/:id/update/avatar").put(UserCtrl.updateAvatar)
router.route("/api/user/:id/update/warrant").put(UserCtrl.updateWarrant)
router.route("/api/user/:id/update/reward-group").put(UserCtrl.updateRewardGroup)

router.route("/api/user/:id/get/partners").get(UserCtrl.getPartners)


export default router;