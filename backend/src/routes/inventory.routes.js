import express from "express";
import {
  adjustStock,
  getExpiringMedicines,
  getInventory,
  getInventoryStats,
  getLowStockMedicines,
  getOutOfStockMedicines,
  updateStock,
  getInStockMedicines
} from "../controllers/inventory.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();



router.get("/", authMiddleware,getInventory);
router.get("/stats", authMiddleware,getInventoryStats);
router.get("/low-stock", authMiddleware,getLowStockMedicines);
router.get("/out-of-stock",authMiddleware, getOutOfStockMedicines);
router.get("/expiring", authMiddleware,getExpiringMedicines);
router.get("/in-stock", authMiddleware,getInStockMedicines);
router.patch("/:id/stock", authMiddleware,updateStock);
router.patch("/:id/stock/adjust", authMiddleware, adjustStock);

export default router;