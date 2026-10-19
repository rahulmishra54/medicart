import express from "express";
import {
  addMedicine,
  deleteMedicine,
  getCatalogMedicines,
  getAllMedicines,
  getMedicineById,
  searchMedicines,
  updateMedicine,
  getAllMedicine
} from "../controllers/medicine.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/search", searchMedicines);
router.get("/catalog", getCatalogMedicines);
router.get("/",authMiddleware,getAllMedicines);
router.get("/all",getAllMedicines);
router.get("/all-medicines", getAllMedicine);
router.post("/", authMiddleware, upload.single("image"), addMedicine);
router.get("/:id", getMedicineById);
router.patch("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);

export default router;