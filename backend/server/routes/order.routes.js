import express from "express";
import authJwt from "../middlewares";
const orderCtrl = require("../controllers/order.controller");

const router = express.Router();

router.route("/order").post(orderCtrl.create)
router.route("/order").get(orderCtrl.get)
router.route("/order/:id").get(orderCtrl.getOne)
router.route("/order/:id").put(orderCtrl.put)
router.route("/order/:id").delete(orderCtrl.delete)

export default router;