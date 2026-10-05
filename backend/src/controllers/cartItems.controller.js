
import CartItem from "../models/cartItem.model.js"
import Cart from "../models/cart.model.js"
async function addToCart(req,res){
    try{
        const {medicineId ,quantity,price}= req.body
        const userId = req.user
        if(!userId || !medicineId || !quantity || !price){
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            })
        }

        const cart = Cart.findOne({user:userId})
        if(!cart){
            const newCart = new Cart({user:userId})
            await newCart.save()

        }

        const cartItem = new CartItem({
            cart:cart._id,
            medicine:medicineId,
            quantity,
            price
        })
        await cartItem.save()
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
        const {cartItemId} = req.params
        if(!cartItemId){
            return res.status(400).json({
                message : "Cart item id is required",
                success : false
            })
        }
        const cartItem = await CartItem.findByIdAndDelete(cartItemId)
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
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
        success: false,
      });
    }

    const cartItem = await CartItem.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        success: false,
      });
    }

    const medicine = await Medicine.findById(cartItem.medicine);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
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