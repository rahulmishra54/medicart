
import CartItem from "../models/cartItem.model.js"
import Cart from "../models/cart.model.js"
import Medicine from "../models/medicine.model.js"

async function addToCart(req,res){
    try{
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Customer login is required", success: false });
    }

    const { medicineId } = req.body;
    const quantity = Number(req.body.quantity);
    if(!medicineId || !Number.isInteger(quantity) || quantity < 1){
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            })
        }

    const medicine = await Medicine.findOne({ _id: medicineId, active: true });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found", success: false });
    }
    if (quantity > medicine.stockQuantity) {
      return res.status(400).json({ message: "Requested quantity is not in stock", success: false });
    }

    let cart = await Cart.findOne({ user: req.user._id });
        if(!cart){
      cart = await Cart.create({ user: req.user._id });
        }

    let cartItem = await CartItem.findOne({ cart: cart._id, medicine: medicineId });
    const updatedQuantity = (cartItem?.quantity || 0) + quantity;
    if (updatedQuantity > medicine.stockQuantity) {
      return res.status(400).json({ message: "Requested quantity is not in stock", success: false });
    }

    if (cartItem) {
      cartItem.quantity = updatedQuantity;
      cartItem.price = medicine.price * updatedQuantity;
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
            message : "Item added to cart successfully",
            success : true,
            cartItem
        })
    
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success : false
        })
    }
}




async function removeCartItem(req,res){
    try{
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Customer login is required", success: false });
    }

        const {cartItemId} = req.params
        if(!cartItemId){
            return res.status(400).json({
                message : "Cart item id is required",
                success : false
            })
        }
        const cart = await Cart.findOne({ user: req.user._id });
        const cartItem = cart
          ? await CartItem.findOneAndDelete({ _id: cartItemId, cart: cart._id })
          : null;
        if(!cartItem){
            return res.status(404).json({
                message : "Cart item not found",
                success : false
            })
        }
        return res.status(200).json({
            message : "Cart item removed successfully",
            success : true
        })
    }catch(error){
        res.status(500).json({
            message : "Internal server error",
            success : false
        })
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