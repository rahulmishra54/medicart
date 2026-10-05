import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pharmacy from "../models/pharmacy.model.js";
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      address,
      dateOfBirth,
    } = req.body;

    // 1. Required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Name, email, password and confirm password are required",
      });
    }

    // 2. Check password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // 3. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create customer
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      dateOfBirth,

      // NEVER take this from req.body
      role: "user",
    });

    await newUser.save();

    // 6. Create JWT
    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // 7. Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 8. Response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("Error registering user:", error);

    return res.status(500).json({
      message: "Internal server error",
        success: false,
    });
  }
};


const loginUser = async(req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
            success: false,
        });
    }
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
        });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}catch (error) {


    res.status(500).json({
        message: "Internal server error",
        success: false,
    })
}
};


const pharmistLogin = async(req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
            success: false,
        });
    }
    const user = await pharmacy.findOne({email});
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
        });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false,
    })
}
};

const logoutUser = async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully",
            success: true,
        });
    }catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        })
    }
};


const pharmistRegister = async (req, res) => {
  try {
    const {
        name,
        email,
        password,
        phone,address,
        licenseNumber
    } = req.body;

    if (!name || !email || !password || !phone || !address || !licenseNumber) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    const existingUser = await pharmacy.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "User with this email already exists",
            success: false
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pharmacy.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        licenseNumber
    });

    return res.status(201).json({
        message: "Pharmacist registered successfully",
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            licenseNumber: user.licenseNumber
        }
    });
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false
    });
  }
};

export { registerUser, loginUser ,pharmistLogin ,logoutUser, pharmistRegister};