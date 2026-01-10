import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2, FiLayers, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition 
     ${pathname === path ? "bg-white/10 text-sky-400" : "text-gray-300 hover:bg-white/5"}`;

  return (
    <aside className="w-60 min-h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 sticky top-16">
      {/*  top-16 makes sidebar start BELOW navbar */}
      <h1 className="text-2xl font-bold mb-10">
        <span className="text-sky-400">Drivana</span>
      </h1>

      <nav className="space-y-3">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <FiHome size={20} /> Home
        </Link>

        <Link to="/dashboard/analytics" className={linkClass("/dashboard/analytics")}>
          <FiBarChart2 size={20} /> Analytics
        </Link>

        <Link to="/compare" className={linkClass("/compare")}>
          <FiLayers size={20} /> Compare Cars
        </Link>

        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 w-full rounded-lg">
          <FiLogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
}
