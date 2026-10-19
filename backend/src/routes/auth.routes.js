import express from "express";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  pharmistLogin,
  pharmistRegister,
  registerUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/pharmacists/register", pharmistRegister);
router.post("/pharmacists/login", pharmistLogin);

export default router;