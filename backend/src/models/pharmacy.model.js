import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password:{
      required: true,
      type: String,
      

    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    image:{
      type:String,
      

    },
    
  },
  {
    timestamps: true,
  }
);

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

export default Pharmacy;