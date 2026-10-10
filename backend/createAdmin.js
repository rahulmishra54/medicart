import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: process.env.EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);

    const admin = await User.create({
      name: process.env.NAME,
      email: process.env.EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password: ", process.env.PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();