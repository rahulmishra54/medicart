
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Prescription from "../models/prescription.model.js";

async function createOrder(req, res) {
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
            });

            if (!prescription) {
                return res.status(400).json({
                    message: "Prescription not found",
                    success: false,
                });
            }
        }

        // 4. Find customer's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(400).json({
                message: "Cart is empty",
                success: false,
            });
        }

        // 5. Fetch cart items
        const cartItems = await CartItem.find({
            cart: cart._id,
        }).populate("medicine");

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
                return res.status(400).json({
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

        for (const [pharmacyId, pharmacyItems] of itemsByPharmacy) {
            const totalAmount = pharmacyItems.reduce(
                (total, item) =>
                    total + item.medicine.price * item.quantity,
                0
            );

            const pharmacyNeedsPrescription = pharmacyItems.some(
                (item) =>
                item.medicine.prescriptionRequired === true
            );

            const order = await Order.create({
                user: userId,
                pharmacy: pharmacyId,
                totalAmount,
                deliveryAddress,

                prescription: pharmacyNeedsPrescription
                    ? prescription._id
                    : null,

                prescriptionStatus: pharmacyNeedsPrescription
                    ? "pending"
                    : "not_required",
            });

            const orderItems = pharmacyItems.map((item) => ({
                order: order._id,
                medicine: item.medicine._id,
                quantity: item.quantity,
                unitPrice: item.medicine.price,
                totalPrice: item.medicine.price * item.quantity,
            }));

            const savedItems = await OrderItem.insertMany(orderItems);

            orders.push({
                order,
                orderItems: savedItems,
            });
        }

        // 8. Clear cart after successful order creation
        await CartItem.deleteMany({ cart: cart._id });

        return res.status(201).json({
            message: "Order placed successfully",
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Create Order Error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}





async function getMyOrders(req, res) {
  try {
    if (!["pharmacist", "user"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Orders are not available for this account",
        success: false,
      });
    }

    const userId = req.user._id;
    let orders
    if(req.user.role =="pharmacist"){
      orders = await Order.find({ pharmacy: userId })
        .populate("user", "name email phone")
        .sort({ orderDate: -1 });


    }
    if(req.user.role=="user"){
      orders = await Order.find({
      user: userId
    })
      .populate("pharmacy", "name")
      .sort({ createdAt: -1 });
    }
    

    
    
    
    const orderItems = await OrderItem.find({
      order: { $in: orders.map((order) => order._id) },
    }).populate("medicine", "name price");
    const itemsByOrder = new Map();

    for (const item of orderItems) {
      const orderId = item.order.toString();
      const items = itemsByOrder.get(orderId) || [];
      items.push(item);
      itemsByOrder.set(orderId, items);
    }

    orders = orders.map((order) => ({
      ...order.toObject(),
      items: itemsByOrder.get(order._id.toString()) || [],
    }));

    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Get My Orders Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
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