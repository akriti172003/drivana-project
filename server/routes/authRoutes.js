import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * @desc    Generate JWT Token
 * @helper  Internal function to keep code clean
 */
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =========================
    📝 USER SIGNUP (Default: isAdmin = false)
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // This creates a standard user. The 'isAdmin' defaults to 'false' in your Schema.
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
    🔑 ADMIN REGISTRATION (Secret/Manual)
========================= */
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await User.create({
      name,
      email,
      password,
      isAdmin: true, // Explicitly set to true
    });

    res.status(201).json({
      message: "Admin account created successfully",
      isAdmin: admin.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
    🔓 LOGIN (Smooth User/Admin Handshake)
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // matchPassword comes from your User.js model methods
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // <--- Frontend uses this for Navbar & Redirects
        token: generateToken(user._id, user.isAdmin),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;