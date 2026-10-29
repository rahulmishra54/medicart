import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Pharmacy from "../models/pharmacy.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    if (decoded.role === "pharmacist") {
      user = await Pharmacy.findById(decoded.userId).select("-password");
    } else {
      user = await User.findById(decoded.userId).select("-password");
    }

    if (!user || (decoded.role === "admin" && user.role !== "admin")) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      ...user.toObject(),
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;