import express from "express";
import {
  addMedicine,
  deleteMedicine,
  getAllMedicines,
  getMedicineById,
  searchMedicines,
  updateMedicine,
} from "../controllers/medicine.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/search", searchMedicines);
router.get("/", authMiddleware, getAllMedicines);
router.post("/", authMiddleware, addMedicine);
router.get("/:id", getMedicineById);
router.patch("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);

export default router;