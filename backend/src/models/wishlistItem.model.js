import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
  },
  { timestamps: true }
);

wishlistItemSchema.index({ user: 1, medicine: 1 }, { unique: true });

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

export default WishlistItem;