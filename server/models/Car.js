const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    segment: { type: String, default: "" },
    engine: { type: String, default: "" },
    power: { type: String, default: "" },
    torque: { type: String, default: "" },
    transmission: { type: String, default: "" },
    fuel: { type: String, default: "" },
    mileage: { type: String, default: "" },
    safety: { type: String, default: "" },
    seats: { type: String, default: "" },
    image: { type: String, default: "/cars/default.jpg" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
