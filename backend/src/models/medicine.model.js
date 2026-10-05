import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    genericName: {
      type: String,
      trim: true,
    },

    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },


    price: {
      type: Number,
      required: true,
      min: 0,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

  
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    
    dosageForm: {
      type: String,
      enum: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Cream",
        "Ointment",
        "Drops",
        "Powder",
        "Other",
      ],
    },

    prescriptionRequired: {
      type: Boolean,
      default: false,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

 
    image: {
      type: String,
    },

   
    featured: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },

    
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;