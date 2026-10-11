import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Pharmacy from "../models/pharmacy.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const accessToken =  req.cookies.token;

    if (!accessToken) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    if (decoded.role === "pharmacist") {
      const pharmacist = await Pharmacy.findById(decoded.userId).select("-password");

      if (!pharmacist) {
        return res.status(401).json({
          message: "Pharmacy account not found",
        });
      }

      req.user = {
        ...pharmacist.toObject(),
        role: "pharmacist",
      };

      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};

export default authMiddleware;