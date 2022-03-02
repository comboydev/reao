import express from "express";
import AdminCtrl from "../controllers/admin.controller";
const router = express.Router();

router.route("/api/admin/auth/signin").post(AdminCtrl.adminSignin);

router.route("/api/admin/users").get(AdminCtrl.getUsers);

router.route("/api/admin/file").post((req, res)=>{
    res.send({message: 'success'});
})


export default router;