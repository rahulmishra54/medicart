

import Prescription from "../models/prescription.model.js";
import { uploadImage } from "../services/cloudinary.js";

const getMyPrescriptions = async(req,res)=>{
    try{
        const userId = req.user
        if(!userId){
            return res.status(400).json({
                message : "User Id is required",
                success : false
            })
        }
        const prescriptions = await Prescription.find({ user: userId }).populate("uploadedBy", "name email").populate("order", "_id totalAmount status");
        if(!prescriptions || prescriptions.length === 0){
            return res.status(404).json({
                message : "No prescriptions found for this user",
                success : false
            })
        }
        return res.status(200).json({
            message : "Prescriptions fetched successfully",
            success :true,
            prescriptions
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
        const prescriptions = await Prescription.find({ status: "pending" })
            .populate("uploadedBy", "name email")
            .populate("order", "_id totalAmount status");

        if (!prescriptions || prescriptions.length === 0) {
            return res.status(404).json({
                message: "No pending prescriptions found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Pending prescriptions fetched successfully",
            success: true,
            prescriptions
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const uploadPrescription = async (req, res) => {
    try {
        const { orderId } = req.body;
        const prescriptionFile = req.files;
        const userId = req.user
        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required",
                success: false
            })
        }
        if (!prescriptionFile || prescriptionFile.length === 0) {
            return res.status(400).json({
                message: "Prescription file is required",
                success: false
            })
        }
        const imageUrls = [];

        for (const file of req.files) {
            const result = await uploadImage(
                file,
                "medicart/prescriptions"
            );

            imageUrls.push(result.secure_url);
        }

        const newPrescription = new Prescription({
            user: userId,
            orderId,
            imageUrl: imageUrls,
            
        });
        await newPrescription.save();
        return res.status(201).json({
            message : "prescription uploaded successfully",
            success : true,
            prescription : newPrescription
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }

}

const getPrescriptionById = async(req,res)=>{
    try{

        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message : "Prescription ID is required",
                success : false
            })
        }
        const prescription = await Prescription.findById(id);
        if(!prescription){
            return res.status(404).json({
                message : "Prescription not found",
                success : false
            })
        }
        return res.status(200).json({
            message : "Prescription fetched successfully",
            success : true,
            prescription
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
        const pharmacistId = req.user;
        const { remarks } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Prescription ID is required",
                success: false
            });
        }

        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({
                message: "Prescription not found",
                success: false
            });
        }

        if (prescription.status !== "pending") {
            return res.status(400).json({
                message: "Prescription is not pending for approval",
                success: false
            });
        }

        prescription.status = "approved";
        prescription.reviewedBy = pharmacistId;
        prescription.reviewDate = new Date();
        if (remarks) {
            prescription.remarks = remarks;
        }

        await prescription.save();

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
        const pharmacistId = req.user;
        const { remarks } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Prescription ID is required",
                success: false
            });
        }

        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({
                message: "Prescription not found",
                success: false
            });
        }

        if (prescription.status !== "pending") {
            return res.status(400).json({
                message: "Prescription is not pending for rejection",
                success: false
            });
        }

        prescription.status = "rejected";
        prescription.reviewedBy = pharmacistId;
        prescription.reviewDate = new Date();
        prescription.remarks = remarks || "Prescription rejected by pharmacist";

        await prescription.save();

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