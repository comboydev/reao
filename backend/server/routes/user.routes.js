import express from "express";
import verifyToken from "../middlewares";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

// router.route("/api/test/all").get(controller.allAccess);
// router.route("/api/test/user").get(authJwt.verifyToken, controller.userBoard);
// router.route("/api/test/mod").get(authJwt.verifyToken, authJwt.isModerator, controller.moderatorBoard);
// router.route("/api/test/admin").get(authJwt.verifyToken, authJwt.isAdmin, controller.adminBoard);

router.route("/admin/users")
    .get(userCtrl.get)
router.route("/admin/users/:id")
    .get(userCtrl.getOne)
    .put(userCtrl.put)
    .delete(userCtrl.delete);

export default router;