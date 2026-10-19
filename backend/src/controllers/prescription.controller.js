

import Prescription from "../models/prescription.model.js";
import { uploadImage } from "../services/cloudinary.js";
import Order from "../models/order.model.js";
const getMyPrescriptions = async(req,res)=>{
    try{
        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message : "User Id is required",
                success : false
            })
        }

        const matchingOrders = await Order.find({
            pharmacy: userId,
            prescription: { $ne: null },
            $or: [
                { prescriptionStatus: "pending" },
                { prescriptionStatus: { $exists: false } },
            ],
        })
            .populate({ path: "prescription", match: { status: "pending" } })
            .populate("user", "name email phone")
            .sort({ orderDate: -1 });
        const prescriptions = matchingOrders.filter((order) => order.prescription);

        return res.status(200).json({
            message : "Prescriptions fetched successfully",
            success :true,
            prescriptions,
            
        })
    }catch{
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
}

const getPendingPrescriptions = async (req, res) => {
    try {
        const pharmacistId = req.user._id;

        const matchingOrders = await Order.find({
            pharmacy: pharmacistId,
            prescription: { $ne: null },
            $or: [
                { prescriptionStatus: "pending" },
                { prescriptionStatus: { $exists: false } },
            ],
        })
            .populate({ path: "prescription", match: { status: "pending" } })
            .populate("user", "name email phone")
            .sort({ orderDate: -1 });
        const prescriptions = matchingOrders.filter((order) => order.prescription);

        return res.status(200).json({
            message: "Pending prescriptions fetched successfully",
            success: true,
            prescriptions,
        });
    } catch (error) {
        console.error("Get Pending Prescriptions Error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


const uploadPrescription = async (req, res) => {
    try {
        const prescriptionFile = req.files?.[0];
        const userId = req.user._id;

        // Validate uploaded file
        if (!prescriptionFile) {
            return res.status(400).json({
                message: "Prescription file is required",
                success: false
            });
        }

        const imageUrls = [];

        // Upload files to Cloudinary
        for (const file of req.files) {
            const result = await uploadImage(
                file,
                "medicart/prescriptions"
            );

            imageUrls.push(result.secure_url);
        }

        // Create prescription without an order initially
        const newPrescription = new Prescription({
            uploadedBy: userId,
            imageUrl: imageUrls
        });

        await newPrescription.save();

        return res.status(201).json({
            message: "Prescription uploaded successfully",
            success: true,
            prescription: newPrescription
        });

    } catch (error) {
        console.error("Prescription upload error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getPrescriptionById = async(req,res)=>{
    try{

        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message : "Prescription ID is required",
                success : false
            })
        }
        const order = await Order.findOne({
            pharmacy: req.user._id,
            prescription: id,
        })
            .populate("prescription")
            .populate("user", "name email phone");

        if(!order?.prescription){
            return res.status(404).json({
                message : "Prescription not found",
                success : false
            })
        }
        return res.status(200).json({
            message : "Prescription fetched successfully",
            success : true,
            prescription: order.prescription,
            order,
        })
    }catch(error){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
}

const approvePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const pharmacistId = req.user._id;
        const { remarks } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Prescription ID is required",
                success: false
            });
        }

        const order = await Order.findOne({
            pharmacy: pharmacistId,
            prescription: id,
            $or: [
                { prescriptionStatus: "pending" },
                { prescriptionStatus: { $exists: false } },
            ],
        });
        if (!order) {
            return res.status(404).json({
                message: "Prescription not found",
                success: false
            });
        }

        const prescription = await Prescription.findOneAndUpdate(
            { _id: id, status: "pending" },
            {
                status: "approved",
                reviewedBy: pharmacistId,
                reviewDate: new Date(),
                ...(remarks ? { remarks } : {}),
            },
            { new: true }
        );

        if (!prescription) {
            return res.status(400).json({
                message: "Prescription is not pending for approval",
                success: false,
            });
        }

        await Order.updateMany(
            {
                pharmacy: pharmacistId,
                prescription: id,
                $or: [
                    { prescriptionStatus: "pending" },
                    { prescriptionStatus: { $exists: false } },
                ],
            },
            { $set: { prescriptionStatus: "approved" } }
        );

        return res.status(200).json({
            message: "Prescription approved successfully",
            success: true,
            prescription
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const rejectPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const pharmacistId = req.user._id;
        const { remarks } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Prescription ID is required",
                success: false
            });
        }

        const order = await Order.findOne({
            pharmacy: pharmacistId,
            prescription: id,
            $or: [
                { prescriptionStatus: "pending" },
                { prescriptionStatus: { $exists: false } },
            ],
        });
        if (!order) {
            return res.status(404).json({
                message: "Prescription not found",
                success: false
            });
        }

        const prescription = await Prescription.findOneAndUpdate(
            { _id: id, status: "pending" },
            {
                status: "rejected",
                reviewedBy: pharmacistId,
                reviewDate: new Date(),
                remarks: remarks || "Prescription rejected by pharmacist",
            },
            { new: true }
        );

        if (!prescription) {
            return res.status(400).json({
                message: "Prescription is not pending for rejection",
                success: false,
            });
        }

        await Order.updateMany(
            {
                pharmacy: pharmacistId,
                prescription: id,
                $or: [
                    { prescriptionStatus: "pending" },
                    { prescriptionStatus: { $exists: false } },
                ],
            },
            { $set: { prescriptionStatus: "rejected" } }
        );

        return res.status(200).json({
            message: "Prescription rejected successfully",
            success: true,
            prescription
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export { uploadPrescription, getPrescriptionById, getMyPrescriptions, getPendingPrescriptions, approvePrescription, rejectPrescription }