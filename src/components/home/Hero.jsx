import CarSlider from "./CarSlider";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      
      {/* Glow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-black opacity-95"></div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold neon-title leading-tight">
            Compare Cars. <br /> Decide Smart.
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-xl">
            Drivana helps you compare cars side-by-side with real specs, pricing,
            and features — all in one premium experience.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-lg transition"
            >
              Compare Cars
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* RIGHT – CAR SLIDER */}
        <CarSlider />
      </div>
    </section>
  );
}
