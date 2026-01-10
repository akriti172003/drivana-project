import Navbar from "../ui/Navbar";
import Hero from "../home/Hero";
import ParticlesBg from "../ParticlesBg";

export default function Home() {
  return (
    
    <div className="relative pt-24">
      <ParticlesBg />
      <Navbar />
      <Hero />
    </div>


  );
}
