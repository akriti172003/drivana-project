import express from "express";
import fs from "fs";
import path from "path";
import Car from "../models/Car.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Helper to get the correct image path - matches your public/cars folder
const getImagePath = (filename) => path.join(process.cwd(), "public", "cars", filename);

/* =============================================
    🚗 PUBLIC ROUTES
   ============================================= */

/**
 * @desc    Get all cars
 */
router.get("/", async (req, res) => {
  try {
    // Standardized to 'fuel' to match frontend
    const { brand, fuel } = req.query; 
    let query = {};

    if (brand) query.brand = new RegExp(brand, 'i');
    if (fuel) query.fuel = fuel;

    const cars = await Car.find(query).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch cars" });
  }
});

/**
 * @desc    Get a single car by ID
 */
router.get("/details/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Invalid Car ID format" });
  }
});

/* =============================================
    🛠️ ADMIN ROUTES
   ============================================= */

/**
 * @desc    Add a new car
 */
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    // Aligned fields with your frontend state
    const { name, brand, price, mileage, fuel, transmission, safety, seating, engine } = req.body;

    if (!name || !brand || !price) {
      return res.status(400).json({ message: "Name, brand, and price are required" });
    }

    const car = await Car.create({
      name,
      brand,
      price,
      mileage,
      fuel, // Changed from fuelType
      transmission,
      safety,
      seating,
      engine,
      image: req.file ? req.file.filename : "default-car.jpg",
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: "Error creating car", error: error.message });
  }
});

/**
 * @desc    Update car + Delete old image
 */
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Ensure we capture all updated fields
    const updateData = { ...req.body };
    
    // If a new image is uploaded
    if (req.file) {
      // 1. Delete the OLD image file
      if (car.image && car.image !== "default-car.jpg") {
        const oldImagePath = getImagePath(car.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // 2. Save the NEW filename
      updateData.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json(updatedCar);
  } catch (error) {
    // This logs the specific validation error we saw earlier (like the Transmission enum error)
    res.status(400).json({ message: "Update failed", error: error.message });
  }
});

/**
 * @desc    Delete a car + Clean up image file
 */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.image && car.image !== "default-car.jpg") {
      const imagePath = getImagePath(car.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await car.deleteOne();
    res.json({ message: "Car removed from inventory" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

export default router;