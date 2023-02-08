import express from "express";
import authJwt from "../middlewares/authJwt";
import authCtrl from "../controllers/auth.controller";
import UserCtrl from "../controllers/user.controller";
import contactCtrl from "../controllers/contact.controller";

const router = express.Router();

router.route("/api/user/auth/signup").post(authCtrl.signup);
router.route("/api/user/auth/signin").post(authCtrl.signin);
router.route("/api/user/auth/resetPassword/:token").post(authCtrl.resetPassword);
router.route("/api/user/auth/sendLinkOfResetPassword").post(authCtrl.sendLinkOfResetPassword);
router.route("/api/user/auth/checkLinkOfResetPassword/:token").get(authCtrl.checkLinkOfResetPassword);

router.route("/api/user/auth/verifyEmail/:token").post(authCtrl.verifyEmail);
router.route("/api/user/auth/sendLinkOfVerifyEmail").post(authCtrl.sendLinkOfVerifyEmail);
router.route("/api/user/auth/changePassword").post(authCtrl.changePassword);

router.route("/api/user/mails/store").post(contactCtrl.store);

router.route("/api/user/auth/withdraw")
    .delete([authJwt.verify], authCtrl.withdraw);

router.route("/api/user/get/personal-info")
    .get([authJwt.verify], UserCtrl.getUserInfo)
router.route("/api/user/update/personal-info")
    .put([authJwt.verify], UserCtrl.updateUserInfo)
router.route("/api/user/update/nickname")
    .put([authJwt.verify], UserCtrl.updateNickname)
router.route("/api/user/update/avatar")
    .put([authJwt.verify], UserCtrl.updateAvatar)
router.route("/api/user/update/warrant")
    .put([authJwt.verify], UserCtrl.updateWarrant)

router.route("/api/user/get/partners")
    .get([authJwt.verify], UserCtrl.getPartners)

export default router;