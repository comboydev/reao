import express from "express";
import authJwt from "../middlewares";
import contactCtrl from "../controllers/contact.controller";

const router = express.Router();

router.route("/api/admin/mails/get").get(contactCtrl.getMails);
router.route("/api/admin/mails/get/:id").get(contactCtrl.getMailOne);
router.route("/api/admin/mails/set/starred").post(contactCtrl.setStarredMails);
router.route("/api/admin/mails/set/starred/:id").post(contactCtrl.setStarredMailOne);
router.route("/api/admin/mails/set/deleted").post(contactCtrl.setDeletedMails);
router.route("/api/admin/mails/set/deleted/:id").post(contactCtrl.setDeletedMailOne);
router.route("/api/admin/mails/delete").post(contactCtrl.deleteMails);
router.route("/api/admin/mails/reply").post(contactCtrl.sendReplyMail);

router.route("/api/user/mails/create").post(contactCtrl.create);

export default router;

