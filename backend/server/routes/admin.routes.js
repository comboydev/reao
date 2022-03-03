import express from "express";
import AdminCtrl from "../controllers/admin.controller";
const router = express.Router();

router.route("/api/admin/auth/signin").post(AdminCtrl.adminSignin);

router.route("/api/admin/user/list").get(AdminCtrl.getUsers);


export default router;