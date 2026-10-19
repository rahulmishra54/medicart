
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Pharmacy from "../models/pharmacy.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    
    const accessToken = req.cookies?.token;
   

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

   
    if (decoded.role === "pharmacist") {
      const pharmacist = await Pharmacy.findById(
        decoded.userId
      ).select("-password");

      if (!pharmacist) {
        return res.status(401).json({
          success: false,
          message: "Pharmacy account not found",
        });
      }

      req.user = {
        ...pharmacist.toObject(),
        role: "pharmacist",
      };

      return next();
    }

    
    if (decoded.role === "user") {
      const user = await User.findById(
        decoded.userId
      ).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = {
        ...user.toObject(),
        role: "user",
      };

      return next();
    }

    if (decoded.role === "admin"){
      const admin = await User.findById(decoded.userId).select("-password");
      if(!admin || admin.role!=="admin"){
        return res.status(401).json({
          success: false
        })
      }
      req.user = {
        ...admin.toObject(),
        role: "admin"
      }
      return next();
    }

 
    return res.status(403).json({
      success: false,
      message: "Invalid user role",
    });

  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  return next();
};

export default authMiddleware;
