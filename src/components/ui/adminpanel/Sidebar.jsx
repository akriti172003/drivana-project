import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiSettings, FiBarChart2, FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 
      p-5 transition-all duration-300 ${open ? "w-64" : "w-20"} overflow-hidden`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-2xl mb-6 hover:text-sky-400 transition"
      >
        <FiMenu />
      </button>

      {/* MENU */}
      <nav className="space-y-6">
        <SidebarItem
          icon={<FiHome />}
          text="Dashboard"
          to="/dashboard"
          open={open}
        />

        <SidebarItem
          icon={<FiUsers />}
          text="Users"
          to="#"
          open={open}
        />

        <SidebarItem
          icon={<FiBarChart2 />}
          text="Analytics"
          to="#"
          open={open}
        />

        <SidebarItem
          icon={<FiSettings />}
          text="Settings"
          to="#"
          open={open}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition"
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="text-sm">{text}</span>}
    </Link>
  );
}
