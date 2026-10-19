import mongoose from "mongoose";
import Medicine from "../models/medicine.model.js";
import WishlistItem from "../models/wishlistItem.model.js";

const getMyWishlist = async (req, res) => {
  try {
    
    if (req.user?.role !== "user") {
      console.warn("[wishlist] response", {
        url: req.originalUrl,
        status: 403,
        data: { message: "Only customers can access a wishlist", success: false },
      });
      return res.status(403).json({ message: "Only customers can access a wishlist", success: false });
    }

    const wishlistItems = await WishlistItem.find({ user: req.user._id })
      .populate({ path: "medicine", populate: { path: "category", select: "name" } });

    console.log("[wishlist] response", {
      url: req.originalUrl,
      status: 200,
      data: { message: "Wishlist fetched successfully", success: true, wishlistItems },
    });
    return res.status(200).json({ message: "Wishlist fetched successfully", success: true, wishlistItems });
  } catch (error) {
    console.error("[wishlist] request failed", {
      url: req.originalUrl,
      status: 500,
      responseData: { message: "Internal server error", success: false },
      error: error.message,
    });
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const addWishlistItem = async (req, res) => {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Only customers can manage a wishlist", success: false });
    }

    const { medicineId } = req.body;
    if (!mongoose.isValidObjectId(medicineId)) {
      return res.status(400).json({ message: "A valid medicine ID is required", success: false });
    }

    const medicine = await Medicine.findOne({ _id: medicineId, active: true });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found", success: false });
    }

    let wishlistItem = await WishlistItem.findOne({ user: req.user._id, medicine: medicineId });
    if (!wishlistItem) {
      wishlistItem = await WishlistItem.create({ user: req.user._id, medicine: medicineId });
    }

    await wishlistItem.populate("medicine");
    return res.status(200).json({ message: "Medicine saved to wishlist", success: true, wishlistItem });
  } catch (error) {
    console.error("Add wishlist item error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const removeWishlistItem = async (req, res) => {
  try {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Only customers can manage a wishlist", success: false });
    }

    const { medicineId } = req.params;
    if (!mongoose.isValidObjectId(medicineId)) {
      return res.status(400).json({ message: "A valid medicine ID is required", success: false });
    }

    const result = await WishlistItem.deleteOne({ user: req.user._id, medicine: medicineId });
    if (!result.deletedCount) {
      return res.status(404).json({ message: "Wishlist item not found", success: false });
    }

    return res.status(200).json({ message: "Medicine removed from wishlist", success: true });
  } catch (error) {
    console.error("Remove wishlist item error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export { getMyWishlist, addWishlistItem, removeWishlistItem };