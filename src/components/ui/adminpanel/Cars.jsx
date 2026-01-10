import React, { useState, useEffect } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    segment: "",
    engine: "",
    power: "",
    torque: "",
    transmission: "",
    fuel: "",
    mileage: "",
    safety: "",
    seats: "",
  });

  const token = localStorage.getItem("adminToken");

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      price: "",
      segment: "",
      engine: "",
      power: "",
      torque: "",
      transmission: "",
      fuel: "",
      mileage: "",
      safety: "",
      seats: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch all cars from backend
  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Error fetching cars", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEdit = (car) => {
    setEditingId(car._id);
    setForm({
      name: car.name || "",
      brand: car.brand || "",
      price: car.price || "",
      segment: car.segment || "",
      engine: car.engine || "",
      power: car.power || "",
      torque: car.torque || "",
      transmission: car.transmission || "",
      fuel: car.fuel || "",
      mileage: car.mileage || "",
      safety: car.safety || "",
      seats: car.seats || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchCars();
      if (editingId === id) resetForm();
    } catch (err) {
      alert("Error deleting car (check backend & token).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.brand) {
      alert("Car name and brand are required.");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/cars/${editingId}`
      : "http://localhost:5000/api/cars";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data);
        alert("Error saving car. Check backend logs.");
        return;
      }

      resetForm();
      fetchCars();
    } catch (err) {
      alert("Network error while saving car.");
    }
  };

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Cars Overview</h3>
          <p className="text-xs text-gray-400">
            Manage cars stored in backend database.
          </p>
        </div>

        <button
          onClick={resetForm}
          className="px-4 py-2 text-sm rounded-lg bg-sky-500 hover:bg-sky-600 text-black font-semibold transition"
        >
          {editingId ? "Cancel Edit" : "Add New Car"}
        </button>
      </div>

      {/* Cars table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
        {loading ? (
          <div className="py-8 text-center text-gray-400 text-sm">
            Loading cars...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="text-left py-3 px-3">Car</th>
                <th className="text-left py-3 px-3">Brand</th>
                <th className="text-left py-3 px-3">Price</th>
                <th className="text-left py-3 px-3 hidden md:table-cell">
                  Engine
                </th>
                <th className="text-left py-3 px-3 hidden md:table-cell">
                  Mileage
                </th>
                <th className="text-left py-3 px-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-3">{car.name}</td>
                  <td className="py-3 px-3">{car.brand}</td>
                  <td className="py-3 px-3">{car.price}</td>
                  <td className="py-3 px-3 hidden md:table-cell">
                    {car.engine}
                  </td>
                  <td className="py-3 px-3 hidden md:table-cell">
                    {car.mileage}
                  </td>
                  <td className="py-3 px-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="px-3 py-1 text-xs rounded bg-red-500/80 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {cars.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 text-sm"
                  >
                    No cars found. Add a new one below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit form */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <h4 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Car" : "Add New Car"}
        </h4>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            placeholder="Car Name (Creta SX)"
            value={form.name}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="brand"
            placeholder="Brand (Hyundai)"
            value={form.brand}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="price"
            placeholder="Price (₹12.5L)"
            value={form.price}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="segment"
            placeholder="Segment (SUV / Sedan / Hatchback)"
            value={form.segment}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="engine"
            placeholder="Engine (1.5L Turbo Petrol)"
            value={form.engine}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="power"
            placeholder="Power (160 bhp)"
            value={form.power}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="torque"
            placeholder="Torque (250 Nm)"
            value={form.torque}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="transmission"
            placeholder="Transmission (MT / AT / DCT)"
            value={form.transmission}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="fuel"
            placeholder="Fuel Type (Petrol / Diesel)"
            value={form.fuel}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="mileage"
            placeholder="Mileage (18 km/l)"
            value={form.mileage}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="safety"
            placeholder="Safety Rating (5 Star)"
            value={form.safety}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            name="seats"
            placeholder="Seats (5 / 7)"
            value={form.seats}
            onChange={handleChange}
            className="bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
          />

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-black font-semibold transition"
            >
              {editingId ? "Save Changes" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
