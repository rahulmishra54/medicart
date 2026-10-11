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





router.get("/users", authMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, getUserById);

router.get("/pharmacies", authMiddleware,  getAllPharmacies);
router.get("/pharmacies/pending", authMiddleware, getPendingPharmacies);
router.get("/pharmacies/stats", authMiddleware,getpharmaciesStats);
router.get("/pharmacies/:id", authMiddleware,getPharmacyById);
router.patch("/pharmacies/:id/approve", authMiddleware, approvePharmacy);
router.patch("/pharmacies/:id/reject", authMiddleware, rejectPharmacy);
router.get("/medicines", authMiddleware, getAllMedicines);
router.get("/categories/stats",authMiddleware,getCategoryStats)
router.get("/categories",  getAllCategories);
router.post("/categories",authMiddleware, createCategory);
router.get("/categories/:id", authMiddleware, getCategoryById);
router.patch("/categories/:id", authMiddleware, updateCategory);
router.delete("/categories/:id", authMiddleware, deleteCategory);

export default router;