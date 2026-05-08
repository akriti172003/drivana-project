import express from "express";
import fs from "fs";
import path from "path";
import Car from "../models/Car.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Helper to get the correct image path - matches your public/cars folder
const getImagePath = (filename) => path.join(process.cwd(), "public", "cars", filename);

// 📊 50 Middle-Class Targeted Indian Cars with 8 Detailed Features
const targetSeedingData = [
  // --- MARUTI SUZUKI ---
  { name: "Maruti Swift", brand: "Maruti", price: "6.49 Lakh", mileage: "24.8 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Maruti Baleno", brand: "Maruti", price: "6.66 Lakh", mileage: "22.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Maruti Brezza", brand: "Maruti", price: "8.34 Lakh", mileage: "17.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Maruti Dzire", brand: "Maruti", price: "6.57 Lakh", mileage: "22.4 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Maruti Ertiga", brand: "Maruti", price: "8.69 Lakh", mileage: "20.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Maruti Grand Vitara", brand: "Maruti", price: "10.80 Lakh", mileage: "21.1 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Maruti Fronx", brand: "Maruti", price: "7.51 Lakh", mileage: "21.7 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Maruti Wagon R", brand: "Maruti", price: "5.54 Lakh", mileage: "24.3 kmpl", fuel: "CNG", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "998 cc", image: "default-car.jpg" },
  { name: "Maruti Alto K10", brand: "Maruti", price: "3.99 Lakh", mileage: "24.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "998 cc", image: "default-car.jpg" },
  { name: "Maruti Celerio", brand: "Maruti", price: "5.36 Lakh", mileage: "25.2 kmpl", fuel: "Petrol", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "998 cc", image: "default-car.jpg" },

  // --- TATA MOTORS ---
  { name: "Tata Punch", brand: "Tata", price: "6.12 Lakh", mileage: "20.0 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Tata Nexon", brand: "Tata", price: "7.99 Lakh", mileage: "17.4 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Tata Altroz", brand: "Tata", price: "6.64 Lakh", mileage: "19.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Tata Tiago", brand: "Tata", price: "5.64 Lakh", mileage: "19.0 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Tata Tigor", brand: "Tata", price: "6.30 Lakh", mileage: "19.2 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Tata Safari", brand: "Tata", price: "16.19 Lakh", mileage: "16.3 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "7 Seated", engine: "1956 cc", image: "default-car.jpg" },
  { name: "Tata Harrier", brand: "Tata", price: "15.49 Lakh", mileage: "16.8 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1956 cc", image: "default-car.jpg" },
  { name: "Tata Punch EV", brand: "Tata", price: "10.99 Lakh", mileage: "315 km/charge", fuel: "EV", transmission: "Automatic", safety: "5 Star", seating: "5 Seated", engine: "Electric Motor", image: "default-car.jpg" },
  { name: "Tata Nexon EV", brand: "Tata", price: "14.49 Lakh", mileage: "465 km/charge", fuel: "EV", transmission: "Automatic", safety: "5 Star", seating: "5 Seated", engine: "Electric Motor", image: "default-car.jpg" },
  { name: "Tata Curvv", brand: "Tata", price: "9.99 Lakh", mileage: "15.0 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },

  // --- HYUNDAI ---
  { name: "Hyundai i20", brand: "Hyundai", price: "7.04 Lakh", mileage: "19.7 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Hyundai Creta", brand: "Hyundai", price: "10.99 Lakh", mileage: "17.4 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1497 cc", image: "default-car.jpg" },
  { name: "Hyundai Venue", brand: "Hyundai", price: "7.94 Lakh", mileage: "17.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Hyundai Exter", brand: "Hyundai", price: "6.13 Lakh", mileage: "19.4 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Hyundai Verna", brand: "Hyundai", price: "11.00 Lakh", mileage: "18.6 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1497 cc", image: "default-car.jpg" },
  { name: "Hyundai Grand i10 Nios", brand: "Hyundai", price: "5.92 Lakh", mileage: "20.7 kmpl", fuel: "Petrol", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Hyundai Alcazar", brand: "Hyundai", price: "16.77 Lakh", mileage: "18.1 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1482 cc", image: "default-car.jpg" },
  { name: "Hyundai Aura", brand: "Hyundai", price: "6.49 Lakh", mileage: "20.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },

  // --- MAHINDRA ---
  { name: "Mahindra XUV300", brand: "Mahindra", price: "7.99 Lakh", mileage: "20.1 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1497 cc", image: "default-car.jpg" },
  { name: "Mahindra XUV700", brand: "Mahindra", price: "13.99 Lakh", mileage: "15.0 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "7 Seated", engine: "2198 cc", image: "default-car.jpg" },
  { name: "Mahindra Scorpio-N", brand: "Mahindra", price: "13.60 Lakh", mileage: "14.0 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "7 Seated", engine: "2198 cc", image: "default-car.jpg" },
  { name: "Mahindra Thar", brand: "Mahindra", price: "11.25 Lakh", mileage: "15.2 kmpl", fuel: "Diesel", transmission: "Manual", safety: "4 Star", seating: "4 Seated", engine: "2184 cc", image: "default-car.jpg" },
  { name: "Mahindra Bolero Neo", brand: "Mahindra", price: "9.90 Lakh", mileage: "17.2 kmpl", fuel: "Diesel", transmission: "Manual", safety: "4 Star", seating: "7 Seated", engine: "1493 cc", image: "default-car.jpg" },
  { name: "Mahindra XUV 3XO", brand: "Mahindra", price: "7.49 Lakh", mileage: "18.9 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },

  // --- KIA ---
  { name: "Kia Seltos", brand: "Kia", price: "10.90 Lakh", mileage: "17.0 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1497 cc", image: "default-car.jpg" },
  { name: "Kia Sonet", brand: "Kia", price: "7.99 Lakh", mileage: "18.2 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Kia Carens", brand: "Kia", price: "10.45 Lakh", mileage: "17.9 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1497 cc", image: "default-car.jpg" },

  // --- HONDA ---
  { name: "Honda Amaze", brand: "Honda", price: "7.16 Lakh", mileage: "18.6 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" },
  { name: "Honda City", brand: "Honda", price: "11.72 Lakh", mileage: "17.8 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1498 cc", image: "default-car.jpg" },
  { name: "Honda Elevate", brand: "Honda", price: "11.58 Lakh", mileage: "15.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "5 Star", seating: "5 Seated", engine: "1498 cc", image: "default-car.jpg" },

  // --- TOYOTA ---
  { name: "Toyota Glanza", brand: "Toyota", price: "6.81 Lakh", mileage: "22.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Toyota Urban Cruiser Taisor", brand: "Toyota", price: "7.74 Lakh", mileage: "21.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "5 Seated", engine: "1197 cc", image: "default-car.jpg" },
  { name: "Toyota Rumion", brand: "Toyota", price: "10.29 Lakh", mileage: "20.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Toyota Innova Crysta", brand: "Toyota", price: "19.99 Lakh", mileage: "12.0 kmpl", fuel: "Diesel", transmission: "Manual", safety: "5 Star", seating: "7 Seated", engine: "2393 cc", image: "default-car.jpg" },

  // --- RENAULT & NISSAN ---
  { name: "Renault Triber", brand: "Renault", price: "6.00 Lakh", mileage: "19.0 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "7 Seated", engine: "999 cc", image: "default-car.jpg" },
  { name: "Renault Kiger", brand: "Renault", price: "6.00 Lakh", mileage: "20.5 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "999 cc", image: "default-car.jpg" },
  { name: "Renault Kwid", brand: "Renault", price: "4.70 Lakh", mileage: "21.4 kmpl", fuel: "Petrol", transmission: "Manual", safety: "2 Star", seating: "5 Seated", engine: "999 cc", image: "default-car.jpg" },
  { name: "Nissan Magnite", brand: "Nissan", price: "6.00 Lakh", mileage: "19.3 kmpl", fuel: "Petrol", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "999 cc", image: "default-car.jpg" },

  // --- ADDITIONAL POPULAR CNGs & SUVs ---
  { name: "Maruti Ertiga CNG", brand: "Maruti", price: "10.73 Lakh", mileage: "26.1 km/kg", fuel: "CNG", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Tata Tiago iCNG", brand: "Tata", price: "6.55 Lakh", mileage: "26.4 km/kg", fuel: "CNG", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" }
];

/* =============================================
    🌱 SEEDING ROUTE (BULK UPLOAD)
   ============================================= */
router.post("/seed", async (req, res) => {
  try {
    // 1. Clear any older conflicting entries
    await Car.deleteMany({});

    // 2. Bulk Insert 50 highly targeted cars in one click
    const seededCars = await Car.insertMany(targetSeedingData);

    res.status(201).json({
      message: "Database seeded successfully with 50 premium middle-class targeted cars! 🚀",
      count: seededCars.length,
      cars: seededCars
    });
  } catch (error) {
    console.error("Seeding Database Crash Trace:", error.message);
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

/* =============================================
    🚗 PUBLIC ROUTES
   ============================================= */

/**
 * @desc    Get all cars
 */
router.get("/", async (req, res) => {
  try {
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
    const { name, brand, price, mileage, fuel, transmission, safety, seating, engine } = req.body;

    if (!name || !brand || !price) {
      return res.status(400).json({ message: "Name, brand, and price are required" });
    }

    const car = await Car.create({
      name,
      brand,
      price,
      mileage,
      fuel, 
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

    const updateData = { ...req.body };
    
    if (req.file) {
      if (car.image && car.image !== "default-car.jpg") {
        const oldImagePath = getImagePath(car.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json(updatedCar);
  } catch (error) {
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