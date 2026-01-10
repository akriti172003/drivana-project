import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ IMPORT ONLY IMAGES YOU ACTUALLY HAVE */
import HyundaiCreta from "../../assets/hyundai_creta.jpg";
import KiaSeltos from "../../assets/kia_seltos.jpg";
import TataHarrier from "../../assets/tata_harrier.jpg";
import MahindraXUV700 from "../../assets/mahindra_xuv700.jpg";
import ToyotaFortuner from "../../assets/toyota_fortuner.jpg";
import TataNexon from "../../assets/tata_nexon.jpg";
import Swift from "../../assets/swift.jpg";
import Verna from "../../assets/verna.jpg";
import City from "../../assets/city.jpg";
import Thar from "../../assets/thar.jpg";

/* ✅ SINGLE SOURCE OF TRUTH — 10 CARS */
const cars = [
  { id: 1, name: "Hyundai Creta", price: "₹11.00 Lakh", img: HyundaiCreta },
  { id: 2, name: "Kia Seltos", price: "₹10.90 Lakh", img: KiaSeltos },
  { id: 3, name: "Tata Harrier", price: "₹15.50 Lakh", img: TataHarrier },
  { id: 4, name: "Mahindra XUV700", price: "₹14.00 Lakh", img: MahindraXUV700 },
  { id: 5, name: "Toyota Fortuner", price: "₹32.00 Lakh", img: ToyotaFortuner },
  { id: 6, name: "Tata Nexon", price: "₹8.10 Lakh", img: TataNexon },
  { id: 7, name: "Maruti Swift", price: "₹6.00 Lakh", img: Swift },
  { id: 8, name: "Hyundai Verna", price: "₹10.90 Lakh", img: Verna },
  { id: 9, name: "Honda City", price: "₹11.60 Lakh", img: City },
  { id: 10, name: "Mahindra Thar", price: "₹11.35 Lakh", img: Thar },
];

export default function CarGrid() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  /* ✅ SELECT / UNSELECT CAR (BUG-FREE) */
  const toggleSelect = (car) => {
    setSelected((prev) => {
      const alreadySelected = prev.some((c) => c.id === car.id);

      if (alreadySelected) {
        return prev.filter((c) => c.id !== car.id);
      }

      if (prev.length >= 10) {
        alert("You can compare maximum 10 cars");
        return prev;
      }

      return [...prev, car];
    });
  };

  /* ✅ COMPARE FLOW (LOGIN PROTECTED) */
  const handleCompare = () => {
    if (selected.length < 2) {
      alert("Select at least 2 cars to compare");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("pendingCompare", JSON.stringify(selected));
      navigate("/login");
      return;
    }

    localStorage.setItem("compareCars", JSON.stringify(selected));
    navigate("/compare");
  };

  return (
    <section id="cars" className="min-h-screen px-8 pb-24">
      {/* TITLE */}
      <h2 className="text-4xl neon-title text-center my-14">
        Select Cars to Compare
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {cars.map((car) => {
          const isSelected = selected.some((c) => c.id === car.id);

          return (
            <div
              key={car.id}
              onClick={() => toggleSelect(car)}
              className={`glass-card soft-hover cursor-pointer p-4 rounded-xl transition
                ${isSelected ? "selected-border" : ""}
              `}
            >
              <img
                src={car.img}
                alt={car.name}
                className="h-48 w-full object-cover rounded-lg"
                loading="lazy"
              />

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-300">{car.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPARE BUTTON */}
      <div className="flex justify-center mt-16">
        <button
          onClick={handleCompare}
          disabled={selected.length < 2}
          className={`px-12 py-4 rounded-xl font-bold shadow-xl transition
            ${
              selected.length < 2
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-sky-400 hover:bg-sky-300 text-black"
            }
          `}
        >
          Compare Selected Cars ({selected.length})
        </button>
      </div>
    </section>
  );
}
