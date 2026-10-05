import express from "express";
import { clearCart, getMyCart } from "../controllers/cart.controller.js";
import {
  addToCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartItems.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMyCart);
router.delete("/:cartId", authMiddleware, clearCart);
router.post("/items", authMiddleware, addToCart);
router.patch("/items/:cartItemId", authMiddleware, updateCartItem);
router.delete("/items/:cartItemId", authMiddleware, removeCartItem);

export default router;