// src/components/ui/hero-slider/HeroSlider.jsx
import React, { useState, useEffect } from "react";

// IMPORTANT: paths are from this file's location:
// src/components/ui/hero-slider/HeroSlider.jsx → go 3 levels up to src/
import img1 from "../../../assets/slider/cars-slider.jpg";
import img2 from "../../../assets/slider/car2-slider.jpg";
import img3 from "../../../assets/slider/car3-slider.jpg";

const images = [img1, img2, img3];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // auto slide every 4s
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-black to-slate-950">
      {/* Glow behind cars */}
      <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-sky-500/40 blur-3xl" />

      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Drivana car ${index + 1}`}
            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[1600ms] ease-out"
          />
        </div>
      ))}

      {/* Gradient overlay at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current
                ? "w-6 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                : "w-2 bg-slate-500/70 hover:bg-sky-300/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
