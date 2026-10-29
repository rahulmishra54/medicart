
import CartItem from "../models/cartItem.model.js"
import Cart from "../models/cart.model.js"
import Medicine from "../models/medicine.model.js"

async function addToCart(req, res) {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Customer login is required",
      });
    }

    const { medicineId, quantity: inputQuantity } = req.body;
    const quantity = Number(inputQuantity);

    if (!medicineId || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine or quantity",
      });
    }

    const medicine = await Medicine.findOne({
      _id: medicineId,
      active: true,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id });
    }

    let cartItem = await CartItem.findOne({
      cart: cart._id,
      medicine: medicineId,
    });

    const newQuantity = (cartItem?.quantity || 0) + quantity;

    if (newQuantity > medicine.stockQuantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity is not in stock",
      });
    }

    if (cartItem) {
      cartItem.quantity = newQuantity;
      cartItem.price = medicine.price * newQuantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart: cart._id,
        medicine: medicineId,
        quantity,
        price: medicine.price * quantity,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}




async function removeCartItem(req, res) {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Customer login is required",
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.cartItemId,
      cart: cart._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });

  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}





async function updateCartItem(req, res) {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Customer login is required", success: false });
    }

    const { cartItemId } = req.params;
    const quantity = Number(req.body.quantity);

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
        success: false,
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    const cartItem = cart
      ? await CartItem.findOne({ _id: cartItemId, cart: cart._id })
      : null;

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        success: false,
      });
    }

    const medicine = await Medicine.findOne({ _id: cartItem.medicine, active: true });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }

    if (quantity > medicine.stockQuantity) {
      return res.status(400).json({ message: "Requested quantity is not in stock", success: false });
    }

    cartItem.quantity = quantity;
    cartItem.price = medicine.price * quantity;

    await cartItem.save();

    return res.status(200).json({
      message: "Cart item updated successfully",
      success: true,
      cartItem,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export {addToCart,removeCartItem,updateCartItem}