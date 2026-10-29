
import mongoose from "mongoose";
import Razorpay from "razorpay";
import Order from "../models/order.model.js";
import crypto from "crypto";
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function createPaymentOrder(req, res) {
    try {
        const { orderId } = req.body;

        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({
                message: "Invalid OrderId",
                success: false
            });
        }

        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            });
        }

        if (order.paymentStatus === "paid" || order.status === "cancelled") {
            return res.status(409).json({
                message: "This order cannot be paid",
                success: false
            });
        }

        if (
            order.prescriptionStatus &&
            !["approved", "not_required"].includes(order.prescriptionStatus)
        ) {
            return res.status(409).json({
                message: "The prescription must be approved before payment",
                success: false
            });
        }

        const amountInPaise = Math.round(order.totalAmount * 100);

        if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
            return res.status(400).json({
                message: "Invalid order amount",
                success: false
            });
        }

        const razorpayOrder = await instance.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: order._id.toString()
        });
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return res.status(201).json({
            success: true,
            message: "Razorpay order created successfully",
            razorpayOrder
        });

    } catch (error) {
        console.error("Payment order error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}







async function verifyPayment(req, res) {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !mongoose.isValidObjectId(orderId) ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid payment details",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "MediCart order not found",
      });
    }

    // Ensure the Razorpay order matches the one
    // created and saved for this MediCart order.
    if (String(order.razorpayOrderId || "") !== String(razorpay_order_id)) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order does not match",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expected = Buffer.from(expectedSignature);
    const received = Buffer.from(razorpay_signature);

    if (
      expected.length !== received.length ||
      !crypto.timingSafeEqual(expected, received)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed",
      });
    }

    // Signature is valid; now confirm payment status with Razorpay.
    const payment = await instance.payments.fetch(
      razorpay_payment_id
    );

    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured" ||
      payment.amount !== Math.round(order.totalAmount * 100) ||
      payment.currency !== "INR"
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment is not captured yet",
      });
    }

    order.paymentStatus = "paid";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
}




export { createPaymentOrder, verifyPayment };
