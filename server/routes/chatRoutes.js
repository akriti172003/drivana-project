import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // Updated to the current 2026 stable model: gemini-2.5-flash
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Fetch cars from your 'drivana' DB for context
    const dbCars = await Car.find({}).limit(10);
    const carData = dbCars.map(c => `${c.name}: ${c.price}`).join(" | ");

    const payload = {
      contents: [{
        parts: [{
          text: `You are Drivana AI. Context: ${carData}. User: ${message}`
        }]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ API Error:", data.error?.message);
      return res.status(response.status).json({ text: "I'm having trouble accessing the latest models." });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    res.json({ text: aiText });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ text: "Internal Server Error" });
  }
});

export default router;