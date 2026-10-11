import Medicine from "../models/medicine.model.js";

// 1. Update stock quantity
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stockQuantity } = req.body;

    if (stockQuantity < 0 || !Number.isInteger(Number(stockQuantity))) {
      return res.status(400).json({
        message: "Stock must be a non-negative whole number",
        success: false,
      });
    }

    const medicine = await Medicine.findOneAndUpdate(
      { _id: id, pharmacy: req.user._id },
      { stockQuantity: Number(stockQuantity) },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Stock updated successfully",
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 2. Increase or decrease stock
const adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { adjustment } = req.body;

    if (!Number.isInteger(Number(adjustment)) || Number(adjustment) === 0) {
      return res.status(400).json({
        message: "Enter a valid stock adjustment",
        success: false,
      });
    }

    const medicine = await Medicine.findOne({
      _id: id,
      pharmacy: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }

    if (medicine.stockQuantity + Number(adjustment) < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
        success: false,
      });
    }

    medicine.stockQuantity += Number(adjustment);
    await medicine.save();

    res.status(200).json({
      message: "Stock adjusted successfully",
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 3. Get low-stock medicines
const getLowStockMedicines = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;

    const medicines = await Medicine.find({
      pharmacy: req.user._id,
      stockQuantity: { $gt: 0, $lte: threshold },
    });

    res.status(200).json({
      message: "Low-stock medicines fetched successfully",
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 4. Get out-of-stock medicines
const getOutOfStockMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      pharmacy: req.user._id,
      stockQuantity: 0,
    });

    res.status(200).json({
      message: "Out-of-stock medicines fetched successfully",
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 5. Get medicines expiring within 30 days
const getExpiringMedicines = async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();

    next30Days.setDate(today.getDate() + 30);

    const medicines = await Medicine.find({
      pharmacy: req.user._id,
      expiryDate: {
        $gte: today,
        $lte: next30Days,
      },
    }).sort({ expiryDate: 1 });

    res.status(200).json({
      message: "Expiring medicines fetched successfully",
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// 6. Get inventory statistics
const getInventoryStats = async (req, res) => {
  try {
    const pharmacyId = req.user._id;

    const totalMedicines = await Medicine.countDocuments({
      pharmacy: pharmacyId,
    });

    const lowStockMedicines = await Medicine.countDocuments({
      pharmacy: pharmacyId,
      stockQuantity: { $gt: 0, $lte: 10 },
    });

    const outOfStockMedicines = await Medicine.countDocuments({
      pharmacy: pharmacyId,
      stockQuantity: 0,
    });

    const inStockMedicines = await Medicine.countDocuments({
      pharmacy: pharmacyId,
      stockQuantity: { $gt: 10 },
    });

    res.status(200).json({
      success: true,
      message: "Inventory stats fetched successfully",
      data: {
        totalMedicines,
        lowStockMedicines,
        outOfStockMedicines,
        inStockMedicines,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get in-stock medicines
const getInStockMedicines = async (req, res) => {
  try {
    const pharmacyId = req.user._id;

    const medicines = await Medicine.find({
      pharmacy: pharmacyId,
      stockQuantity: { $gt: 10 },
    });

    res.status(200).json({
      success: true,
      message: "In-stock medicines fetched successfully",
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 7. Get all inventory medicines
const getInventory = async (req, res) => {
  try {
    const pharmacyId = req.user._id;

    const medicines = await Medicine.find({
      pharmacy: pharmacyId,
    }).populate("category");

    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export {
  updateStock,
  adjustStock,
  getLowStockMedicines,
  getOutOfStockMedicines,
  getExpiringMedicines,
  getInventoryStats,
  getInventory,
  getInStockMedicines
};
