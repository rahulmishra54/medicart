import express from "express";
import {
  approvePrescription,
  getMyPrescriptions,
  getPendingPrescriptions,
  getPrescriptionById,
  rejectPrescription,
  uploadPrescription,
} from "../controllers/prescription.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", authMiddleware,  upload.any(), uploadPrescription);
router.get("/mine", authMiddleware,  getMyPrescriptions);
router.get("/pending", authMiddleware, getPendingPrescriptions);
router.get("/:id", authMiddleware, getPrescriptionById);
router.patch("/:id/approve", authMiddleware, approvePrescription);
router.patch("/:id/reject", authMiddleware, rejectPrescription);

export default router;