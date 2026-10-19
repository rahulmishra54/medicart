import express from "express";
import {
  approvePrescription,
  getMyPrescriptions,
  getPendingPrescriptions,
  getPrescriptionById,
  rejectPrescription,
  uploadPrescription,
} from "../controllers/prescription.controller.js";
import authMiddleware, { requireRole } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("user"), upload.any(), uploadPrescription);
router.get("/mine", authMiddleware, requireRole("pharmacist"), getMyPrescriptions);
router.get("/pending", authMiddleware, requireRole("pharmacist"), getPendingPrescriptions);
router.get("/:id", authMiddleware, requireRole("pharmacist"), getPrescriptionById);
router.patch("/:id/approve", authMiddleware, requireRole("pharmacist"), approvePrescription);
router.patch("/:id/reject", authMiddleware, requireRole("pharmacist"), rejectPrescription);

export default router;