import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBG() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: "#000000" },
        particles: {
          number: { value: 60 },
          color: { value: "#00bfff" },
          opacity: { value: 0.4 },
          size: { value: 2 },
          move: { enable: true, speed: 1 },
          links: { enable: true, distance: 120, color: "#00bfff" },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
