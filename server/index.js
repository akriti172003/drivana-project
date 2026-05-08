import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

import connectDB from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Car from "./models/Car.js"; // 🚗 Imported Car Model for direct seeding

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =========================
    🌐 CORS CONFIGURATION
========================= */
const allowedOrigins = [
  "https://drivana-project.vercel.app",
  "https://drivana-project-git-main-akriti172003s-projects.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by Drivana CORS Security"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
    🖼️ STATIC FILES
========================= */
app.use("/uploads", express.static(path.join(__dirname, "public", "cars")));

/* =========================
    📦 DATABASE
========================= */
connectDB();

/* =========================
    🌱 50 MIDDLE-CLASS TARGETED CARS DATASET
========================= */
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

  // --- ADDITIONAL POPULAR CNGs ---
  { name: "Maruti Ertiga CNG", brand: "Maruti", price: "10.73 Lakh", mileage: "26.1 km/kg", fuel: "CNG", transmission: "Manual", safety: "3 Star", seating: "7 Seated", engine: "1462 cc", image: "default-car.jpg" },
  { name: "Tata Tiago iCNG", brand: "Tata", price: "6.55 Lakh", mileage: "26.4 km/kg", fuel: "CNG", transmission: "Manual", safety: "4 Star", seating: "5 Seated", engine: "1199 cc", image: "default-car.jpg" }
];

/* =========================================
    🌱 DIRECT SEED ENDPOINT (Guaranteed Match)
========================= */
app.post("/api/seed", async (req, res) => {
  try {
    // 1. Purane dummy values delete karein
    await Car.deleteMany({});
    
    // 2. 50 high-quality documents ek click mein insert karein
    const seeded = await Car.insertMany(targetSeedingData);
    
    res.status(201).json({
      message: "Database successfully seeded with 50 family cars! 🚀",
      count: seeded.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
    🤖 AI CHATBOT (WITH FAILOVER)
========================= */
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_KEY);

app.post("/api/ai/chat", async (req, res) => {
  const { message, inventory, isPremium } = req.body;

  const prompt = `
      System: You are Drivana AI, a senior car consultant. 
      Inventory Context: ${inventory || "General car knowledge"}.
      User Access: ${isPremium ? "PREMIUM" : "FREE"}.
      
      Instructions:
      - Recommend specific cars from the inventory.
      - If user is FREE and asks for deep technical specs (like Torque in Newton-meters), suggest upgrading.
      - Keep responses under 60 words.
      - Current Date: April 2026.
      
      User Question: ${message}
    `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error (2.5 Busy):", error.message);
    try {
      console.log("🔄 Falling back to Gemini 1.5 Flash...");
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await fallbackModel.generateContent(prompt);
      const text = result.response.text();
      res.json({ reply: text });
    } catch (fallbackError) {
      res.json({ 
        reply: "My neural sensors are calibrating due to high traffic. Based on our current inventory, the XUV700 and Swift are top picks. What is your preferred budget?" 
      });
    }
  }
});

/* =========================
    🚏 ROUTES
========================= */
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/chat", chatRoutes); 

/* =========================
    ✅ TEST & START
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Drivana Backend API v2.5 is Online");
});

app.use((req, res) => {
  res.status(404).json({ message: "API Route not found." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📂 Car assets served from: ${path.join(__dirname, "public", "cars")}`);
});