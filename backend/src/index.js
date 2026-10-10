import express from "express"
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import orderRoutes from "./routes/order.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials : true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/medicines", medicineRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/prescriptions", prescriptionRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
