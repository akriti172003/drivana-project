import { useEffect, useState } from "react";
import API from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      alert("Failed to load cars");
    }
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await API.delete(`/cars/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCars();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl neon-title mb-6">Manage Cars</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="glass-card p-5 flex justify-between">
            <h2 className="font-semibold">{car.name}</h2>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit/${car._id}`)}
                className="bg-yellow-500 px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="bg-red-500 px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
