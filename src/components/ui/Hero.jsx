import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ Use SAME images you already have */
import HyundaiCreta from "../../assets/hyundai_creta.jpg";
import KiaSeltos from "../../assets/kia_seltos.jpg";
import TataHarrier from "../../assets/tata_harrier.jpg";
import MahindraXUV700 from "../../assets/mahindra_xuv700.jpg";
import ToyotaFortuner from "../../assets/toyota_fortuner.jpg";

const heroCars = [
  { name: "Hyundai Creta", img: HyundaiCreta, tagline: "Smart • Stylish • Powerful" },
  { name: "Kia Seltos", img: KiaSeltos, tagline: "Bold SUV Experience" },
  { name: "Tata Harrier", img: TataHarrier, tagline: "Built for Dominance" },
  { name: "Mahindra XUV700", img: MahindraXUV700, tagline: "Tech Meets Power" },
  { name: "Toyota Fortuner", img: ToyotaFortuner, tagline: "Legendary Performance" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  /* 🔁 Auto change hero car */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroCars.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const car = heroCars[index];

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* 🔥 Background Image */}
      <img
        src={car.img}
        alt={car.name}
        className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm"></div>

      {/* ✨ Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold neon-title mb-4">
          {car.name}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          {car.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-xl bg-sky-400 hover:bg-sky-300 transition text-black font-bold shadow-xl"
          >
            Compare Cars
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition text-white font-semibold"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
