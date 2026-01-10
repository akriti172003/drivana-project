import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/ui/Hero";
import CarGrid from "./components/ui/CarGrid";
import ComparePage from "./components/ui/ComparePage";
import Contact from "./components/ui/Contact";
import Login from "./components/ui/Login";

import Navbar from "./components/ui/Navbar";
import ParticlesBg from "./components/ParticlesBg";

/* 🔐 ADMIN */
import AdminDashboard from "./components/ui/admin/AdminDashboard";
import AdminAddCar from "./components/ui/admin/AdminAddCar";
import AdminCars from "./components/ui/admin/AdminCars";
import AdminEditCar from "./components/ui/admin/AdminEditCar";
import AdminRoute from "./components/ui/auth/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <ParticlesBg />
        <Navbar />

        <Routes>
          {/* 🌐 USER SIDE */}
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

          {/* 🔐 ADMIN LAYOUT */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            {/* default admin page */}
            <Route index element={<AdminCars />} />

            {/* /admin/dashboard */}
            <Route path="dashboard" element={<AdminCars />} />

            {/* /admin/cars */}
            <Route path="cars" element={<AdminCars />} />

            {/* /admin/add-car */}
            <Route path="add-car" element={<AdminAddCar />} />

            {/* /admin/edit/123 */}
            <Route path="edit/:id" element={<AdminEditCar />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
