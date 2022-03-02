import express from "express";
import verifySignUp from "../middlewares";
import authCtrl from "../controllers/auth.controller";
const router = express.Router();

// router.route("/api/auth/signup").post(
//   [
//     verifySignUp.checkDuplicateUsernameOrEmail,
//     verifySignUp.checkRolesExisted
//   ],
//   authCtrl.signup
// );
router.route("/api/auth/signup").post(authCtrl.signup);
router.route("/api/auth/signin").post(authCtrl.signin);
router.route("/api/auth/changePassword").post(authCtrl.changePassword);
router.route("/api/auth/verifyEmail").post(authCtrl.verifyEmail);
router.route("/api/auth/sendLinkOfVerifyEmail").post(authCtrl.sendLinkOfVerifyEmail);


router.route("/api/auth/personal-info").post(authCtrl.setPersonalInfo);
router.route("/api/auth/contact").post(authCtrl.contact);
router.route("/api/auth/upload-image").post(authCtrl.uploadImage);
router.route("/api/auth/upload-id").post(authCtrl.uploadID);
router.route("/api/auth/personal-info").get(authCtrl.getPersonalInfo);
router.route("/api/auth/quit").post(authCtrl.quit);


export default router;