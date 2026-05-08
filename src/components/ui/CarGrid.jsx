import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { getCars } from "../api/api"; // 🔄 Imported getCars endpoint wrapper

export default function CarGrid() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search functionality

  /* 🔄 FETCH FROM BACKEND */
  useEffect(() => {
    fetchCarsList();
  }, []);

  const fetchCarsList = async () => {
    try {
      // Calling wrapped getCars() from api.js
      const res = await getCars();
      setCars(res.data);
    } catch (err) {
      console.error("Failed to load cars from Render DB", err);
    }
  };

  /* ✅ SEARCH FILTER LOGIC */
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ✅ SELECT / UNSELECT */
  const toggleSelect = (car) => {
    setSelected((prev) =>
      prev.some((c) => c._id === car._id)
        ? prev.filter((c) => c._id !== car._id)
        : [...prev, car]
    );
  };

  /* ✅ COMPARE FLOW */
  const handleCompare = () => {
    if (selected.length < 2) {
      alert("Select at least 2 cars");
      return;
    }
    localStorage.setItem("compareCars", JSON.stringify(selected));
    navigate("/compare");
  };

  return (
    <section id="cars" className="min-h-screen px-8 pb-24">
      <h2 className="text-4xl neon-title text-center my-14">
        Explore 200+ Premium Cars
      </h2>

      {/* 🔍 SEARCH BAR UI */}
      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search by brand or model (e.g. Tesla, BMW)..."
          className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="text-gray-500 text-center mt-3 text-sm">
          Showing {filteredCars.length} cars
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredCars.map((car) => {
          const isSelected = selected.some((c) => c._id === car._id);

          // 🖼️ DYNAMIC IMAGE PATH (Uses deployed server URL as fallback base)
          const imageBaseURL = "https://drivana-project-1.onrender.com";
          const imageSrc = car.image?.startsWith("http")
            ? car.image
            : `${imageBaseURL}/uploads/${car.image}`;

          // 💰 SOLID LAKH SUFFIX PRESENTATION FORMATTING
          const displayPrice = car.price 
            ? `₹${Number(car.price).toLocaleString("en-IN")} Lakh` 
            : "Price on Request";

          return (
            <div
              key={car._id}
              onClick={() => toggleSelect(car)}
              className={`glass-card soft-hover cursor-pointer p-4 rounded-xl transition
                ${isSelected ? "ring-2 ring-sky-400 bg-sky-400/10 shadow-[0_0_20px_rgba(56,189,248,0.3)]" : "border border-white/5"}
              `}
            >
              <img
                src={imageSrc}
                alt={car.name}
                className="h-48 w-full object-cover rounded-lg"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400&h=300";
                }}
              />

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                
                {/* 💎 Perfected dynamic Lakh formatting layout */}
                <p className="text-sm text-sky-400 font-bold">
                  {displayPrice}
                </p>

                <div className="flex justify-center gap-2 mt-2">
                   <span className="text-[10px] px-2 py-1 bg-slate-800 rounded text-gray-400 uppercase">
                      {/* 🔄 Synced with database attribute structure */}
                      {car.fuel || car.fuelType || "Petrol"}
                   </span>
                   <span className="text-[10px] px-2 py-1 bg-slate-800 rounded text-gray-400 uppercase">
                      {car.bhp || "120"} BHP
                   </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 STICKY ACTION BAR */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <button
          onClick={handleCompare}
          disabled={selected.length < 2}
          className={`px-12 py-4 rounded-full font-bold shadow-2xl transition pointer-events-auto
            ${
              selected.length < 2
                ? "bg-gray-800 scale-90 opacity-0 text-gray-500 translate-y-20"
                : "bg-sky-400 hover:bg-sky-300 text-black translate-y-0 opacity-100"
            }
          `}
        >
          Compare {selected.length} Selected Cars
        </button>
      </div>
    </section>
  );
}