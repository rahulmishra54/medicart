import mongoose from "mongoose";
import Medicine from "../models/medicine.model.js";
import { uploadImage } from "../services/cloudinary.js";

const addMedicine = async (req, res) => {
  try {
    if (req.user?.role !== "pharmacist") {
      return res.status(403).json({
        message: "Only pharmacists can add medicines",
        success: false,
      });
    }

    const {
      name,
      brand,
      genericName,
      manufacturer,
      description,
      category,
      subCategory,
      price,
      mrp,
      stockQuantity,
      dosageForm,
      prescriptionRequired,
      expiryDate,
      featured,
      active,
    } = req.body;

    if (!name?.trim() || !brand?.trim() || !manufacturer?.trim()
      || !description?.trim() || !category || price === undefined || price === ""
      || mrp === undefined || mrp === "" || stockQuantity === undefined || stockQuantity === ""
      || !expiryDate) {
      return res.status(400).json({
        message: "Complete all required medicine fields",
        success: false,
      });
    }

    const numericPrice = Number(price);
    const numericMrp = Number(mrp);
    const numericStock = Number(stockQuantity);
    if (!Number.isFinite(numericPrice) || numericPrice < 0
      || !Number.isFinite(numericMrp) || numericMrp < 0
      || !Number.isInteger(numericStock) || numericStock < 0) {
      return res.status(400).json({
        message: "Prices must be non-negative and stock must be a whole number",
        success: false,
      });
    }

    if (req.file && (!["image/jpeg", "image/png", "image/webp"].includes(req.file.mimetype)
      || req.file.size > 5 * 1024 * 1024)) {
      return res.status(400).json({
        message: "Choose a JPG, PNG, or WebP image up to 5 MB",
        success: false,
      });
    }

    const newMedicine = new Medicine({
      name: name.trim(),
      brand: brand.trim(),
      genericName,
      manufacturer: manufacturer.trim(),
      description: description.trim(),
      category,
      subCategory,
      price: numericPrice,
      mrp: numericMrp,
      stockQuantity: numericStock,
      dosageForm: dosageForm || undefined,
      prescriptionRequired: prescriptionRequired === "true" || prescriptionRequired === true,
      expiryDate,
      featured: featured === "true" || featured === true,
      active: active !== "false" && active !== false,
      pharmacy: req.user._id,
    });

    await newMedicine.validate();

    if (req.file) {
      let uploadedImage;
      try {
        uploadedImage = await uploadImage(req.file, "medicart/medicines");
      } catch (error) {
        console.error("Medicine image upload error:", error);
        return res.status(502).json({
          message: "Image upload failed. Check the image and try again.",
          success: false,
        });
      }

      newMedicine.image = uploadedImage.secure_url;
    }

    await newMedicine.save();

    return res.status(201).json({
      message: "Medicine added successfully",
      success: true,
      medicine: newMedicine,
    });
  } catch (error) {
    console.error("Add medicine error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    }

    return res.status(500).json({
      message: "Unable to save medicine. Please verify the details and try again.",
      success: false,
    });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicineFilter = req.user.role === "admin"
      ? { _id: id }
      : req.user.role === "pharmacist"
        ? { _id: id, pharmacy: req.user._id }
        : null;

    if (!medicineFilter) {
      return res.status(403).json({ message: "You cannot update medicines", success: false });
    }

    if (!id) {
      return res.status(400).json({
        message: "Medicine ID is required",
        success: false,
      });
    }

    const {
      name,
      brand,
      genericName,
      manufacturer,
      description,
      category,
      subCategory,
      price,
      mrp,
      stockQuantity,
      dosageForm,
      prescriptionRequired,
      expiryDate,
      image,
      featured,
      active,
    } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (brand !== undefined) updateData.brand = brand;
    if (genericName !== undefined) updateData.genericName = genericName;
    if (manufacturer !== undefined) updateData.manufacturer = manufacturer;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;
    if (price !== undefined) updateData.price = price;
    if (mrp !== undefined) updateData.mrp = mrp;
    if (stockQuantity !== undefined) {
      updateData.stockQuantity = stockQuantity;
    }
    if (dosageForm !== undefined) updateData.dosageForm = dosageForm;
    if (prescriptionRequired !== undefined) {
      updateData.prescriptionRequired = prescriptionRequired;
    }
    if (expiryDate !== undefined) updateData.expiryDate = expiryDate;
    if (image !== undefined) updateData.image = image;
    if (featured !== undefined) updateData.featured = featured;
    if (active !== undefined) updateData.active = active;

    const updatedMedicine = await Medicine.findOneAndUpdate(
      medicineFilter,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMedicine) {
      return res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Medicine updated successfully",
      success: true,
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Update medicine error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id)
      .populate("category");

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    return res.status(200).json({
      message: "Medicine fetched successfully",
      medicine,
    });
  } catch (error) {
    console.error("Get medicine error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicineFilter = req.user.role === "admin"
      ? { _id: id }
      : req.user.role === "pharmacist"
        ? { _id: id, pharmacy: req.user._id }
        : null;

    if (!medicineFilter) {
      return res.status(403).json({ message: "You cannot delete medicines", success: false });
    }

    const medicine = await Medicine.findOneAndDelete(medicineFilter);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    return res.status(200).json({
      message: "Medicine deleted successfully",
      medicine,
    });
  } catch (error) {
    console.error("Delete medicine error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const searchMedicines = async(req,res)=>{
    try{
    const query = req.query.query?.trim();
    if(!query){
            return res.status(400).json({
                message : "Search query is required",
                success : false
            })
        }

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const medicines = await Medicine.find({
      active: true,
      expiryDate: { $gt: new Date() },
            $or : [
        {name : {$regex : safeQuery, $options : "i"}},
        {brand : {$regex : safeQuery, $options : "i"}},
        {genericName : {$regex : safeQuery, $options : "i"}}
            ]
    })
      .populate("category", "name")
      .populate("pharmacy", "name");

        return res.status(200).json({
            message : "Medicines fetched successfully",
            success : true,
            medicines
        })
    }catch(error){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
}

const getCatalogMedicines = async (req, res) => {
  try {
    const { query, category, sort, discounted } = req.query;
    const filter = { active: true, expiryDate: { $gt: new Date() } };

    if (category) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ message: "Invalid category ID", success: false });
      }
      filter.category = category;
    }

    if (query?.trim()) {
      const safeQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: safeQuery, $options: "i" } },
        { brand: { $regex: safeQuery, $options: "i" } },
        { genericName: { $regex: safeQuery, $options: "i" } },
      ];
    }

    if (discounted === "true") {
      filter.$expr = { $gt: ["$mrp", "$price"] };
    }

    const sortOptions = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      name: { name: 1 },
    };
    const medicines = await Medicine.find(filter)
      .populate("category", "name")
      .populate("pharmacy", "name")
      .sort(sortOptions[sort] || { name: 1 });

    return res.status(200).json({
      message: "Medicines fetched successfully",
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get catalog medicines error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


const getAllMedicines = async (req, res) => {
  try {
    let medicines;
    console.log(req.user.role)

    
    if (req.user.role === "admin" ) {
      medicines = await Medicine.find()
        .populate("category", "name")
        .populate("pharmacy", "name");
    }

    
    else if (req.user.role === "pharmacist") {
      medicines = await Medicine.find({
        pharmacy: req.user._id,
      })
        .populate("category", "name")
        .populate("pharmacy", "name");

    }
    else if(req.user.role === "user"){
      medicines = await Medicine.find({active:true, expiryDate:{$gt:new Date()}})
    }    
    else {
      return res.status(403).json({ message: "You cannot view inventory", success: false });
    }

    return res.status(200).json({
      message: "Medicines fetched successfully",
      count: medicines.length,
      medicines,
    });

  } catch (error) {
    console.error("Get all medicines error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { addMedicine, updateMedicine, getMedicineById, deleteMedicine, searchMedicines, getAllMedicines, getCatalogMedicines };

