import React, { useState } from "react";
import { API } from "../../../api/api";

export default function AddCar() {
  const [car, setCar] = useState({
    name: "",
    image: "",
    engine: "",
    mileage: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/cars", car);
      alert("Car added successfully!");
    } catch (err) {
      alert("Failed to add car");
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Car Name"
          className="p-3 rounded bg-white/10 w-full"
          onChange={(e) => setCar({ ...car, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="p-3 rounded bg-white/10 w-full"
          onChange={(e) => setCar({ ...car, image: e.target.value })}
        />

        <input
          type="text"
          placeholder="Engine"
          className="p-3 rounded bg-white/10 w-full"
          onChange={(e) => setCar({ ...car, engine: e.target.value })}
        />

        <input
          type="text"
          placeholder="Mileage"
          className="p-3 rounded bg-white/10 w-full"
          onChange={(e) => setCar({ ...car, mileage: e.target.value })}
        />

        <input
          type="text"
          placeholder="Price"
          className="p-3 rounded bg-white/10 w-full"
          onChange={(e) => setCar({ ...car, price: e.target.value })}
        />

        <button className="bg-blue-500 px-4 py-2 rounded">
          Add Car
        </button>

      </form>
    </div>
  );
}
