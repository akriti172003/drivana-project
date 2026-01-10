import { useEffect, useState } from "react";

import Creta from "../../assets/hyundai_creta.jpg";
import Seltos from "../../assets/kia_seltos.jpg";
import Harrier from "../../assets/tata_harrier.jpg";
import XUV700 from "../../assets/mahindra_xuv700.jpg";
import Fortuner from "../../assets/toyota_fortuner.jpg";

const images = [Creta, Seltos, Harrier, XUV700, Fortuner];

export default function CarSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center">
      <div className="glass-card p-4 rounded-2xl shadow-2xl">
        <img
          src={images[index]}
          alt="Car"
          className="rounded-xl object-cover w-[380px] md:w-[460px] transition-all duration-700"
        />
      </div>
    </div>
  );
}
