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

router.use(authMiddleware);

router.get("/", getInventory);
router.get("/stats", getInventoryStats);
router.get("/low-stock", getLowStockMedicines);
router.get("/out-of-stock", getOutOfStockMedicines);
router.get("/expiring", getExpiringMedicines);
router.get("/in-stock", getInStockMedicines);
router.patch("/:id/stock", updateStock);
router.patch("/:id/stock/adjust", adjustStock);

export default router;