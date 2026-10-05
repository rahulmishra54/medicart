import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

async function getMyCart(req, res) {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

  
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        success: true,
        cartItems: [],
      });
    }

    
    const cartItems = await CartItem.find({
      cart: cart._id,
    }).populate("medicine");

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      success: true,
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
    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({
        message: "Cart ID is required",
        success: false,
      });
    }

    // Find cart
    const cart = await Cart.findById(cartId);

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