import Medicine from "../models/medicine.model.js";

const addMedicine = async (req,res)=>{
    try{

        const {name,brand,genericName,manufacturer,description,category,subCategory,price,mrp,stockQuantity,dosageForm,prescriptionRequired,expiryDate,image,featured,active} = req.body;

        if(!name || !brand || !manufacturer || !description || !category || !price || !mrp || !stockQuantity || !dosageForm || !prescriptionRequired || !expiryDate || !image){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }


        const newMedicine = new Medicine({
            name,brand,genericName,manufacturer,description,category,subCategory,price,mrp,stockQuantity,dosageForm,prescriptionRequired,expiryDate,image,featured,active
        })

        await newMedicine.save();

        return res.status(201).json({
            message: "Medicine added successfully",
            success: true,
            medicine: newMedicine
        })

    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success:false
        });
    }
}

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;

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

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
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

    const medicine = await Medicine.findByIdAndDelete(id);

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
        const {query}=req.query;
        if(!query){
            return res.status(400).json({
                message : "Search query is required",
                success : false
            })
        }

        const medicines = await Medicine.find({
            $or : [
                {name : {$regex : query, $options : "i"}},
                {brand : {$regex : query, $options : "i"}},
                {genericName : {$regex : query, $options : "i"}}
            ]
        });

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


const getAllMedicines = async (req, res) => {
  try {
    let medicines;

    // Admin can see all medicines
    if (req.user.role === "admin") {
      medicines = await Medicine.find()
        .populate("category")
        .populate("pharmacy");
    }

    // Pharmacist can see only their pharmacy medicines
    else if (req.user.role === "pharmacist") {
      const pharmacy = await Pharmacy.findOne({
        owner: req.user.userId,
      });

      if (!pharmacy) {
        return res.status(404).json({
          message: "Pharmacy not found",
        });
      }

      medicines = await Medicine.find({
        pharmacy: pharmacy._id,
      })
        .populate("category")
        .populate("pharmacy");
    }

    else {
      return res.status(403).json({
        message: "Access denied",
      });
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



export{addMedicine, updateMedicine,getMedicineById,deleteMedicine,searchMedicines,getAllMedicines};

