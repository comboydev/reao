import express from "express";
import purchaseCtrl from "../controllers/purchase.controller";

const router = express.Router();

router.route("/api/admin/orders/get").get(purchaseCtrl.getAllOrders);

router.route("/api/user/purchase/order/create").post(purchaseCtrl.createOrder);



export default router;

