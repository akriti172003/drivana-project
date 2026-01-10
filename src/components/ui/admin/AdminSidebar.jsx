import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-sky-500/20 text-sky-400"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-[#050b1d] border-r border-white/10 p-6 flex flex-col">
      
      {/* LOGO */}
      <h2 className="text-2xl font-extrabold neon-title mb-10">
        DRIVANA ADMIN
      </h2>

      {/* LINKS */}
      <nav className="flex flex-col gap-3 text-sm font-medium flex-1">
        <NavLink to="/admin/cars" className={linkClass}>
          🚗 Manage Cars
        </NavLink>

        <NavLink to="/admin/add-car" className={linkClass}>
          ➕ Add New Car
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-auto bg-red-500/10 text-red-400 border border-red-500/30 py-2 rounded-lg hover:bg-red-500/20 transition"
      >
        Logout
      </button>
    </div>
  );
}
