import express from "express";
import authJwt from "../middlewares";
import sellCtrl from "../controllers/sell.controller";

const router = express.Router();

router.route("/sell").get(sellCtrl.get)
router.route("/sell").post(sellCtrl.create)
router.route("/sell/:id").get(sellCtrl.getOne)
router.route("/sell/:id").put(sellCtrl.put)
router.route("/sell/:id").delete(sellCtrl.delete)
      
export default router;

