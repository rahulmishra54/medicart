import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-payment", authMiddleware,  createPaymentOrder);
router.post("/verify-payment", authMiddleware,verifyPayment);


export default router;