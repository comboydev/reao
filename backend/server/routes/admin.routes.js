import express from "express";
import AdminCtrl from "../controllers/admin.controller";
const router = express.Router();

router.route("/api/admin/auth/signin").post(AdminCtrl.adminSignin);


export default router;