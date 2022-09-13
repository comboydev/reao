import express from "express";
import AdminCtrl from "../controllers/admin.controller";
import BankCtrl from "../controllers/bank.controller";
import RewardCtrl from "../controllers/reward.controller";
const router = express.Router();

router.route("/api/admin/auth/signin").post(AdminCtrl.adminSignin);
router.route("/api/admin/auth/changePassword").put(AdminCtrl.changePassword)

router.route("/api/admin/update/profile").put(AdminCtrl.updateProfile);
router.route("/api/admin/update/avatar").put(AdminCtrl.updateAvatar);

router.route("/api/admin/update/bankInfo").put(BankCtrl.updateBankInfo);         //Bank Controller
router.route("/api/admin/get/bankInfo/:userID").get(BankCtrl.getBankInfo);

router.route("/api/admin/users/all").get(AdminCtrl.getAllUsers);
router.route("/api/admin/users/affiliaters").get(AdminCtrl.getAffiliaters);
router.route("/api/admin/users/:id/affiliaters/connect").post(AdminCtrl.connectUsersToAffiliater);
router.route("/api/admin/users/:id").get(AdminCtrl.getUserOne);
router.route("/api/admin/users/:id/set/confirmed/identity").put(AdminCtrl.setConfirmedIdentity);
router.route("/api/admin/users/:id/set/disable").put(AdminCtrl.setDisableAccount);
router.route("/api/admin/users/:id/delete").delete(AdminCtrl.deleteUser);

router.route("/api/admin/affiliate/reward-group").get(RewardCtrl.getAll);
router.route("/api/admin/affiliate/reward-group/create").post(RewardCtrl.create);
router.route("/api/admin/affiliate/reward-group/update/:groupID").put(RewardCtrl.update);
router.route("/api/admin/affiliate/reward-group/delete/:groupID").delete(RewardCtrl.deleteOne);

export default router;