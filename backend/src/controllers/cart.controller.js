import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

async function getMyCart(req, res) {
  try {
    if (req.user?.role !== "user") {
      return res.status(401).json({
        message: "Customer login is required",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        success: true,
        cartId: null,
        cartItems: [],
      });
    }

    const cartItems = await CartItem.find({ cart: cart._id }).populate("medicine");

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      success: true,
      cartId: cart._id,
      cartItems,
    });

  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}


async function clearCart(req, res) {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Customer login is required", success: false });
    }

    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({
        message: "Cart ID is required",
        success: false,
      });
    }

    // Find cart
    const cart = await Cart.findOne({ _id: cartId, user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    await CartItem.deleteMany({
      cart: cartId,
    });

    await Cart.findByIdAndDelete(cartId);

    return res.status(200).json({
      message: "Cart cleared successfully",
      success: true,
    });

  } catch (error) {
    console.error("Clear cart error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export {clearCart,getMyCart}