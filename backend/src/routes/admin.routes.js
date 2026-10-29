import express from "express";
import {
  approvePharmacy,
  getAllMedicines,
  getAllPharmacies,
  getAllUsers,
  getPendingPharmacies,
  getPharmacyById,
  getUserById,
  rejectPharmacy,
  getpharmaciesStats
} from "../controllers/admin.controller.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getCategoryStats
} from "../controllers/category.Controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";



const router = express.Router();



router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/pharmacies", getAllPharmacies);
router.get("/pharmacies/pending", getPendingPharmacies);
router.get("/pharmacies/stats", getpharmaciesStats);
router.get("/pharmacies/:id", getPharmacyById);
router.patch("/pharmacies/:id/approve", approvePharmacy);
router.patch("/pharmacies/:id/reject", rejectPharmacy);
router.get("/medicines", getAllMedicines);
router.get("/categories/stats", getCategoryStats);
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.get("/categories/:id", getCategoryById);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;