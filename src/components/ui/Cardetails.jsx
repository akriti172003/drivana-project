import React from "react";
import { useParams, Link } from "react-router-dom";
import { cars } from "./CarData";

export default function CarDetails() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* Back */}
      <Link to="/" className="text-blue-400 hover:text-blue-300 text-lg">
        ← Back
      </Link>

      {/* Title */}
      <h1 className="text-center text-4xl font-bold neon-title mt-4">
        {car.name}
      </h1>

      {/* Glass Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/20 shadow-xl animate-fadeIn">

        {/* Car Image */}
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-64 object-cover rounded-xl shadow-lg"
        />

        {/* Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-400 text-sm">Engine</p>
            <p className="text-xl font-semibold mb-4">{car.engine}</p>

            <p className="text-gray-400 text-sm">Mileage</p>
            <p className="text-xl font-semibold mb-4">{car.mileage}</p>

            <p className="text-gray-400 text-sm">Fuel Type</p>
            <p className="text-xl font-semibold mb-4">{car.fuel}</p>

            <p className="text-gray-400 text-sm">Transmission</p>
            <p className="text-xl font-semibold mb-4">{car.transmission}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Price</p>
            <p className="text-xl font-semibold mb-4">{car.price}</p>

            <p className="text-gray-400 text-sm">Top Speed</p>
            <p className="text-xl font-semibold mb-4">{car.speed}</p>

            <p className="text-gray-400 text-sm">Seating Capacity</p>
            <p className="text-xl font-semibold mb-4">{car.seating}</p>

            <p className="text-gray-400 text-sm">Boot Space</p>
            <p className="text-xl font-semibold mb-4">{car.boot}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/compare"
            state={{ selectedCars: [car.id] }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
          >
            Compare This Car
          </Link>

          <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition border border-white/30">
            Save to Wishlist ⭐
          </button>
        </div>

      </div>
    </div>
  );
}
