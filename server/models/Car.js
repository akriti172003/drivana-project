import mongoose from "mongoose";

/**
 * @schema Car
 * @description Defines the structure for vehicle inventory entries.
 * Synchronized with the AI Comparison Engine and Backend Routes.
 */
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vehicle model name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Manufacturer brand is required"],
      trim: true,
    },
    price: {
      type: Number, // Changed to Number for better sorting/formatting
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      default: "default-car.jpg",
    },
    // ✅ ADDED/UPDATED TO MATCH YOUR COMPARE PAGE
    bhp: {
      type: String,
      default: "120", // Default power for seeded cars
    },
    torque: {
      type: String,
      default: "150", // Default torque
    },
    mileage: {
      type: String,
      default: "18 kmpl",
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "EV", "Hybrid", "CNG"],
      default: "Petrol",
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic", "CVT", "DCT", "AMT"],
      default: "Manual",
    },
    safetyRating: {
      type: String,
      default: "5", // Matches the safetyRating key in your UI
    },
    // --- Keep the others for deeper spec analysis ---
    seating: {
      type: String,
      default: "5",
    },
    boot: {
      type: String,
      default: "N/A",
    },
    airbags: {
      type: String,
      default: "N/A",
    },
    drive: {
      type: String,
      default: "FWD",
    },
  },
  {
    timestamps: true,
  }
);

// Add a text index to allow for optimized keyword searching across Name and Brand
carSchema.index({ name: "text", brand: "text" });

const Car = mongoose.model("Car", carSchema);

export default Car;