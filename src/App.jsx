import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/ui/Hero";
import CarGrid from "./components/ui/CarGrid";
import ComparePage from "./components/ui/ComparePage";
import Contact from "./components/ui/Contact";
import Login from "./components/ui/Login";
import Navbar from "./components/ui/Navbar";
import ParticlesBg from "./components/ParticlesBg";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <ParticlesBg />
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CarGrid />
              </>
            }
          />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
