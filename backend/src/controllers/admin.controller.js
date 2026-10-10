import User from "../models/user.model.js";
import Pharmacy from "../models/pharmacy.model.js";
import Medicine from "../models/medicine.model.js";
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};


const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Pharmacies fetched successfully",
      count: pharmacies.length,
      pharmacies,
    });
  } catch (error) {
    console.error("Get All Pharmacies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacies",
      error: error.message,
    });
  }
};




const getPendingPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ status: "pending" });

    res.status(200).json({
      success: true,
      message: "Pending pharmacies fetched successfully",
      count: pharmacies.length,
      pharmacies,
    });
  } catch (error) {
    console.error("Get Pending Pharmacies Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pending pharmacies",
      error: error.message,
    });
  }
};


const approvePharmacy = async (req, res) => {
  try {
    const { id } = req.params;

    const pharmacy = await Pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    if (pharmacy.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Pharmacy is already approved",
      });
    }

    pharmacy.status = "approved";

    await pharmacy.save();

    res.status(200).json({
      success: true,
      message: "Pharmacy approved successfully",
      pharmacy,
    });
  } catch (error) {
    console.error("Approve Pharmacy Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to approve pharmacy",
      error: error.message,
    });
  }
};




const getPharmacyById = async (req, res) => {
  try {
    const { id } = req.params;

    const pharmacy = await Pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pharmacy fetched successfully",
      pharmacy,
    });
  } catch (error) {
    console.error("Get Pharmacy By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacy",
      error: error.message,
    });
  }
};

const rejectPharmacy = async (req, res) => {
  try {
    const { id } = req.params;

    const pharmacy = await Pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    if (pharmacy.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Pharmacy is already rejected",
      });
    }

    pharmacy.status = "rejected";

    await pharmacy.save();

    res.status(200).json({
      success: true,
      message: "Pharmacy rejected successfully",
      pharmacy,
    });
  } catch (error) {
    console.error("Reject Pharmacy Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject pharmacy",
      error: error.message,
    });
  }
};



const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get All Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};


export { getAllUsers, getUserById, getAllPharmacies, getPendingPharmacies, approvePharmacy, getPharmacyById, rejectPharmacy, getAllMedicines };