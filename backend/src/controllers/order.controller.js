import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";



async function createOrder(req, res) {
  try {
    const userId = req.user;
    let { deliveryAddress } = req.body;

    // 1. Check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // 2. If address is not provided, use user's saved address
    if (!deliveryAddress) {
      deliveryAddress = user.address;
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        message: "Delivery address is required",
        success: false,
      });
    }

    // 3. Find user's cart
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

    // 4. Find cart items
    const cartItems = await CartItem.find({
      cart: cart._id,
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

    // 5. Create Order
    const order = new Order({
      user: userId,
      pharmacy: cart.pharmacy,
      totalAmount: cart.totalAmount,
      deliveryAddress: deliveryAddress,
    });

    const savedOrder = await order.save();

    // 6. Create OrderItems
    const orderItems = cartItems.map((item) => {
      return {
        order: savedOrder._id,
        medicine: item.medicine,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      };
    });

    const savedOrderItems = await OrderItem.insertMany(orderItems);

    // 7. Clear cart items
    await CartItem.deleteMany({
      cart: cart._id,
    });

    // 8. Response
    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: savedOrder,
      orderItems: savedOrderItems,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}


// ================= GET MY ORDERS =================

async function getMyOrders(req, res) {
  try {
    const userId = req.user;

    const orders = await Order.find({
      user: userId,
    })
      .populate("pharmacy", "name")
      .sort({ createdAt: -1 });

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
    const userId = req.user;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).populate("pharmacy", "name");

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
    const userId = req.user;
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