import express from "express";
import {
  loginUser,
  logoutUser,
  pharmistLogin,
  pharmistRegister,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/pharmacists/register", pharmistRegister);
router.post("/pharmacists/login", pharmistLogin);

export default router;