import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { carDetails } from "../../data/carDetails";
import { useNavigate } from "react-router-dom";

export default function ComparePage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("compareCars");
    if (!stored) {
      navigate("/");
      return;
    }
    setCars(JSON.parse(stored));
  }, [navigate]);

  if (!cars.length) return null;

  const features = [
    "price",
    "engine",
    "mileage",
    "fuel",
    "transmission",
    "seating",
    "safety",
    "boot",
    "airbags",
    "drive",
  ];

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <h2 className="text-4xl neon-title text-center mt-28 mb-10">
        Car Comparison
      </h2>

      <div className="overflow-x-auto px-6">
        <div className="glass-card p-6 rounded-2xl min-w-[900px]">

          {/* HEADER */}
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] border-b border-white/10">
            <div className="sticky left-0 bg-[#0a0e24] z-10 p-4 font-semibold text-sky-400">
              Feature
            </div>

            {cars.map((car) => (
              <div key={car.id} className="p-4 text-center">
                <img
                  src={car.img}
                  alt={car.name}
                  className="h-20 mx-auto rounded-lg mb-2"
                />
                <p className="font-semibold">{car.name}</p>
              </div>
            ))}
          </div>

          {/* ROWS */}
          {features.map((feature) => (
            <div
              key={feature}
              className="grid grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] border-b border-white/5"
            >
              <div className="sticky left-0 bg-[#0a0e24] z-10 p-4 text-sky-300 font-medium">
                {feature.toUpperCase()}
              </div>

              {cars.map((car) => {
                const details = carDetails[car.name] || {};
                return (
                  <div
                    key={car.id + feature}
                    className="p-4 text-center text-gray-200"
                  >
                    {feature === "price"
                      ? car.price
                      : details[feature] || "—"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
