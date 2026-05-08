import express from "express";
import bcrypt from "bcryptjs"; // Safe hashing for production
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Make sure your User model path is correct

const router = express.Router();

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || "drivana_secret_key_123", 
    { expiresIn: "30d" }
  );
};

/* ==========================================
   👤 ROUTE: REGISTER / SIGNUP USER
   ========================================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation check
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered" });
    }

    // 3. Hash the password manually before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Store the safely hashed password
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
        name: user.name,
        message: "Registration successful!",
      });
    } else {
      res.status(400).json({ message: "Invalid user data setup" });
    }
  } catch (error) {
    console.error("Signup Route Error:", error.message);
    res.status(500).json({ 
      message: "Server encountered registration crash", 
      error: error.message 
    });
  }
});

/* ==========================================
   🔑 ROUTE: LOGIN USER
   ========================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation check
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // 2. Find User by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Match passwords using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Return Session Payload
    res.json({
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
      name: user.name,
      message: `Welcome back, ${user.name}!`,
    });
  } catch (error) {
    console.error("Login Route Error:", error.message);
    res.status(500).json({ 
      message: "Server encountered login crash", 
      error: error.message 
    });
  }
});

export default router;