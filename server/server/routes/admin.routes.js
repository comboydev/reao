import express from "express";
import authJwt from "../middlewares/authJwt";
import AdminCtrl from "../controllers/admin.controller";
import BankCtrl from "../controllers/bank.controller";
import RewardCtrl from "../controllers/reward.controller";
import coinCtrl from "../controllers/coin.controller";
import contactCtrl from "../controllers/contact.controller";

const router = express.Router();

router.route("/api/admin/auth/signin").post(AdminCtrl.adminSignin);
router.route("/api/admin/auth/changePassword").put(AdminCtrl.changePassword)

router.route("/api/admin/get/profile")
    .get([authJwt.verify, authJwt.isAdmin], AdminCtrl.getProfile);
router.route("/api/admin/update/profile")
    .put([authJwt.verify, authJwt.isAdmin], AdminCtrl.updateProfile);
router.route("/api/admin/update/bankInfo")
    .put([authJwt.verify, authJwt.isAdmin], BankCtrl.updateOrCreate);         //Bank Controller
router.route("/api/admin/get/bankInfo")
    .get([authJwt.verify, authJwt.isAdmin], BankCtrl.get);

router.route("/api/admin/users/all")
    .get([authJwt.verify, authJwt.isAdmin], AdminCtrl.getAllUsers);
router.route("/api/admin/users/affiliaters")
    .get([authJwt.verify, authJwt.isAdmin], AdminCtrl.getAffiliaters);
router.route("/api/admin/users/:id/affiliaters/connect")
    .post([authJwt.verify, authJwt.isAdmin], AdminCtrl.connectUsersToAffiliater);
router.route("/api/admin/users/:id/partners")
    .get([authJwt.verify, authJwt.isAdmin], AdminCtrl.getPartners);
router.route("/api/admin/users/:id")
    .get([authJwt.verify, authJwt.isAdmin], AdminCtrl.getUserOne);
router.route("/api/admin/users/:id/set/confirmed/identity")
    .put([authJwt.verify, authJwt.isAdmin], AdminCtrl.setConfirmedIdentity);
router.route("/api/admin/users/:id/set/disable")
    .put([authJwt.verify, authJwt.isAdmin], AdminCtrl.setDisableAccount);
router.route("/api/admin/users/:id/delete")
    .delete([authJwt.verify, authJwt.isAdmin], AdminCtrl.deleteUser);

router.route("/api/admin/users/:id/update/reward-group")
    .put([authJwt.verify], AdminCtrl.updateRewardGroup)

router.route("/api/admin/affiliate/reward-group")
    .get([authJwt.verify, authJwt.isAdmin], RewardCtrl.getAll);
router.route("/api/admin/affiliate/reward-group/create")
    .post([authJwt.verify, authJwt.isAdmin], RewardCtrl.create);
router.route("/api/admin/affiliate/reward-group/update/:groupID")
    .put([authJwt.verify, authJwt.isAdmin], RewardCtrl.update);
router.route("/api/admin/affiliate/reward-group/delete/:groupID")
    .delete([authJwt.verify, authJwt.isAdmin], RewardCtrl.deleteOne);

router.route("/api/admin/coins/store")
    .post([authJwt.verify, authJwt.isAdmin], coinCtrl.store);
router.route("/api/admin/coins/:id/update")
    .put([authJwt.verify, authJwt.isAdmin], coinCtrl.update);
router.route("/api/admin/coins/bulkDelete")
    .post([authJwt.verify, authJwt.isAdmin], coinCtrl.bulkDelete);

router.route("/api/admin/mails/get")
    .get([authJwt.verify, authJwt.isAdmin], contactCtrl.getMails);
router.route("/api/admin/mails/get/:id")
    .get([authJwt.verify, authJwt.isAdmin], contactCtrl.getMailOne);
router.route("/api/admin/mails/set/starred")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.setStarredMails);
router.route("/api/admin/mails/set/starred/:id")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.setStarredMailOne);
router.route("/api/admin/mails/set/deleted")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.setDeletedMails);
router.route("/api/admin/mails/set/deleted/:id")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.setDeletedMailOne);
router.route("/api/admin/mails/delete")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.deleteMails);
router.route("/api/admin/mails/reply")
    .post([authJwt.verify, authJwt.isAdmin], contactCtrl.sendReplyMail);

export default router;