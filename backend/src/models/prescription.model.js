import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: [String],
      required: true,
    },

    uploadDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      default: null,
    },

    reviewDate: {
      type: Date,
      default: null,
      
    },

    remarks: {
      type: String,
      maxlength: 500,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);

export default Prescription;