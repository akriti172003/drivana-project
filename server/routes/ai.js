const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google AI with your Key
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message, inventory, isPremium } = req.body;

    // Use the 1.5-flash model for speed and reliability
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are Drivana AI, a professional car consultant.
      Our Current Inventory: ${inventory}.
      User Access Level: ${isPremium ? "PREMIUM (Access to all specs)" : "FREE (Basic info only)"}.
      
      Instructions:
      1. Only recommend cars from the provided inventory.
      2. If a FREE user asks for technical details (Torque, BHP, Top Speed), tell them to upgrade to Premium.
      3. Keep answers friendly and under 3 sentences.
      
      User Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Server Error:", error);
    res.status(500).json({ error: "Failed to connect to AI engine" });
  }
});

module.exports = router;