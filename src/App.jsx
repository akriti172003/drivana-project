import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layout & UI Components
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import CarGrid from "./components/ui/CarGrid";
import ComparePage from "./components/ui/ComparePage";
import Contact from "./components/ui/Contact";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup"; 
import ParticlesBg from "./components/ParticlesBg";

// Features
import DrivanaChatbot from "./components/Chatbot/DrivanaChatbot";
import EChallan from "./components/ui/EChallan";

// Admin Components
import AdminDashboard from "./components/ui/admin/AdminDashboard";
import AdminAddCar from "./components/ui/admin/AdminAddCar";
import AdminCars from "./components/ui/admin/AdminCars";
import AdminEditCar from "./components/ui/admin/AdminEditCar";

// Auth Guards
import AdminRoute from "./components/ui/auth/AdminRoute";
import UserRoute from "./components/ui/auth/UserRoute"; // Import the Gatekeeper
import { isLoggedIn } from "./utils/auth"; // For conditional chatbot

export default function App() {
  const authenticated = isLoggedIn();

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-950 text-white selection:bg-sky-500/30">
        <ParticlesBg />
        <Navbar />

        <main className="pt-20"> 
          <Routes>
            {/* =============================================
                🚪 AUTH ROUTES (Publicly Accessible)
               ============================================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />

            {/* =============================================
                🔒 PROTECTED USER ROUTES (Login Required)
               ============================================= */}
            <Route path="/" element={
              <UserRoute>
                <Hero />
                <CarGrid />
              </UserRoute>
            } />
            
            <Route path="/compare" element={
              <UserRoute>
                <ComparePage />
              </UserRoute>
            } />

            <Route path="/e-challan" element={
              <UserRoute>
                <EChallan />
              </UserRoute>
            } />

            {/* =============================================
                🛠️ PROTECTED ADMIN ROUTES (Admin Only)
               ============================================= */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div className="admin-layout max-w-7xl mx-auto px-6">
                    <Outlet /> 
                  </div>
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} /> 
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="add-car" element={<AdminAddCar />} />
              <Route path="edit/:id" element={<AdminEditCar />} />
            </Route>

            {/* =============================================
                🚫 404 - PAGE NOT FOUND
               ============================================= */}
            <Route path="*" element={
              <div className="h-[80vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-black text-slate-800 mb-4">404</h1>
                <p className="text-xl text-slate-400 font-medium">This car has left the showroom.</p>
                <button 
                  onClick={() => window.location.href = "/"}
                  className="mt-8 px-6 py-2 bg-sky-500 rounded-full text-black font-bold hover:bg-sky-400 transition-all"
                >
                  Return Home
                </button>
              </div>
            } />
          </Routes>
        </main>

        {/* 🤖 Chatbot only shows for logged-in users */}
        {authenticated && <DrivanaChatbot />}
      </div>
    </BrowserRouter>
  );
}