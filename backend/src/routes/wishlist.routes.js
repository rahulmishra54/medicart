import express from "express";
import {
  addWishlistItem,
  getMyWishlist,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, getMyWishlist);
router.post("/items", authMiddleware, addWishlistItem);
router.delete("/items/:medicineId", authMiddleware, removeWishlistItem);

export default router;