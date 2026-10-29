import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    razorpayOrderId: {
      type: String,
      default: null,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },

    prescriptionStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "not_required"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;