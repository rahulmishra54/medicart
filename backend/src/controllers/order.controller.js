
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Prescription from "../models/prescription.model.js";
import Medicine from "../models/medicine.model.js";

async function createOrder(req, res) {
  let session;

    try {
        // 1. Verify customer authentication
        if (req.user?.role !== "user") {
            return res.status(403).json({
                message: "Customer login is required",
                success: false,
            });
        }

        const userId = req.user._id;
        const { prescriptionId } = req.body;
        let { deliveryAddress } = req.body;
        session = await mongoose.startSession();

        // 2. Validate delivery address
        deliveryAddress = deliveryAddress?.trim();

        if (!deliveryAddress) {
            return res.status(400).json({
                message: "Delivery address is required",
                success: false,
            });
        }

        // 3. Validate prescription ownership
        let prescription = null;

        if (prescriptionId) {
            if (!mongoose.isValidObjectId(prescriptionId)) {
                return res.status(400).json({
                    message: "Invalid prescription ID",
                    success: false,
                });
            }

            prescription = await Prescription.findOne({
                _id: prescriptionId,
                uploadedBy: userId,
            }).session(session);

            if (!prescription) {
                return res.status(400).json({
                    message: "Prescription not found",
                    success: false,
                });
            }
        }

        // 4. Find customer's cart
        const cart = await Cart.findOne({ user: userId }).session(session);

        if (!cart) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false,
            });
        }

        // 5. Fetch cart items
        const cartItems = await CartItem.find({ cart: cart._id })
          .populate("medicine")
          .session(session);

        if (!cartItems.length) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false,
            });
        }

        // 6. Validate medicines and group items by pharmacy
        const itemsByPharmacy = new Map();

        for (const item of cartItems) {
            const medicine = item.medicine;

            if (!medicine || !medicine.pharmacy) {
                return res.status(400).json({
                    message: "A cart medicine is no longer available",
                    success: false,
                });
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    message: `Invalid quantity for ${medicine.name}`,
                    success: false,
                });
            }

            if (item.quantity > medicine.stockQuantity) {
                return res.status(409).json({
                    message: `${medicine.name} does not have enough stock`,
                    success: false,
                });
            }

            const requiresPrescription =
              medicine.prescriptionRequired === true;

            if (requiresPrescription && !prescription) {
                return res.status(400).json({
                    message: `A prescription is required for ${medicine.name}`,
                    success: false,
                });
            }

            const pharmacyId = medicine.pharmacy.toString();

            if (!itemsByPharmacy.has(pharmacyId)) {
                itemsByPharmacy.set(pharmacyId, []);
            }

            itemsByPharmacy.get(pharmacyId).push(item);
        }

        // 7. Create one order per pharmacy
        const orders = [];

        await session.withTransaction(async () => {
          orders.length = 0;

          for (const [pharmacyId, pharmacyItems] of itemsByPharmacy) {
            for (const item of pharmacyItems) {
              const stockUpdate = await Medicine.updateOne(
                {
                  _id: item.medicine._id,
                  active: true,
                  expiryDate: { $gt: new Date() },
                  stockQuantity: { $gte: item.quantity },
                },
                { $inc: { stockQuantity: -item.quantity } },
                { session }
              );

              if (stockUpdate.modifiedCount !== 1) {
                const stockError = new Error(`${item.medicine.name} is no longer available in the requested quantity`);
                stockError.statusCode = 409;
                throw stockError;
              }
            }

            const totalAmount = pharmacyItems.reduce(
              (total, item) => total + item.medicine.price * item.quantity,
              0
            );

            const pharmacyNeedsPrescription = pharmacyItems.some(
              (item) => item.medicine.prescriptionRequired === true
            );

            const order = new Order({
              user: userId,
              pharmacy: pharmacyId,
              totalAmount,
              deliveryAddress,
              prescription: pharmacyNeedsPrescription ? prescription._id : null,
              prescriptionStatus: pharmacyNeedsPrescription ? "pending" : "not_required",
            });
            await order.save({ session });

            const orderItems = pharmacyItems.map((item) => ({
              order: order._id,
              medicine: item.medicine._id,
              quantity: item.quantity,
              unitPrice: item.medicine.price,
              totalPrice: item.medicine.price * item.quantity,
            }));

            const savedItems = await OrderItem.insertMany(orderItems, { session });
            orders.push({ order, orderItems: savedItems });
          }

          await CartItem.deleteMany({ cart: cart._id }).session(session);
        });

        return res.status(201).json({
          message: "Order placed successfully",
          success: true,
          orders,
        });
      } catch (error) {
        console.error("Create Order Error:", error);

        return res.status(error.statusCode || 500).json({
          message: error.statusCode === 409
            ? error.message
            : "Unable to place order. Please try again.",
          success: false,
        });
      } finally {
        if (session) await session.endSession();
      }
}





async function getMyOrders(req, res) {
  try {
    const { role, _id } = req.user;

    if (!["pharmacist", "user"].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Orders are not available for this account",
      });
    }

    let orders;

    if (role === "pharmacist") {
      orders = await Order.find({ pharmacy: _id })
        .populate("user", "name email phone")
        .sort({ orderDate: -1 });
    } else {
      orders = await Order.find({ user: _id })
        .populate("pharmacy", "name")
        .sort({ createdAt: -1 });
    }

    for (const order of orders) {
      order.items = await OrderItem.find({ order: order._id })
        .populate("medicine", "name price");
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {
    console.error("Get My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// ================= GET ORDER BY ID =================

async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;
    const ownerFilter = req.user.role === "pharmacist"
      ? { pharmacy: req.user._id }
      : req.user.role === "user"
        ? { user: req.user._id }
        : null;

    if (!ownerFilter) {
      return res.status(403).json({
        message: "Orders are not available for this account",
        success: false,
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      ...ownerFilter,
    })
      .populate("pharmacy", "name email phone address")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    const orderItems = await OrderItem.find({
      order: order._id,
    }).populate("medicine");

    return res.status(200).json({
      message: "Order fetched successfully",
      success: true,
      order,
      orderItems,
    });

  } catch (error) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}


// ================= CANCEL ORDER =================

async function cancelOrder(req, res) {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Customer login is required",
        success: false,
      });
    }

    const userId = req.user._id;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    // Only allow cancellation before shipping
    if (
      order.status === "shipped" ||
      order.status === "delivered" ||
      order.status === "cancelled"
    ) {
      return res.status(400).json({
        message: `Order cannot be cancelled because its status is ${order.status}`,
        success: false,
      });
    }

    order.status = "cancelled";

    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      success: true,
      order,
    });

  } catch (error) {
    console.error("Cancel Order Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}


export {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};