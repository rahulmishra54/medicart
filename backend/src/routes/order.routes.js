import express from "express";
import {
  cancelOrder,
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();



router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/:orderId", authMiddleware, getOrderById);
router.patch("/:orderId/cancel", authMiddleware, cancelOrder);

export default router;