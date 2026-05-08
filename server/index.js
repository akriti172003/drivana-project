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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =========================
    🌐 CORS CONFIGURATION (Updated for Vercel & Local)
========================= */
const allowedOrigins = [
  "https://drivana-project.vercel.app",
  "https://drivana-project-git-main-akriti172003s-projects.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman or server-to-server)
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
    // 🚀 Primary: Try the high-demand 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error (2.5 Busy):", error.message);

    // 🔄 Fallback: Use 1.5 Flash if 2.5 is experiencing high demand (503)
    try {
      console.log("🔄 Falling back to Gemini 1.5 Flash...");
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await fallbackModel.generateContent(prompt);
      const text = result.response.text();
      res.json({ reply: text });
    } catch (fallbackError) {
      // 🛡️ Final Safety: Hardcoded helpful response
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