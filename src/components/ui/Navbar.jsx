import { NavLink } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold neon-title">
          DRIVANA
        </NavLink>

        {/* NAV LINKS */}
        <div className="flex gap-8 text-sm font-semibold items-center">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/compare">Compare</NavItem>
          <NavItem to="/contact">Contact</NavItem>

          {isAdmin && (
            <NavItem to="/admin/dashboard">
              <span className="text-yellow-400">Admin</span>
            </NavItem>
          )}

          <NavItem to="/login">Login</NavItem>
        </div>
      </div>
    </nav>
  );
}

/* Reusable nav item */
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative pb-1 transition ${
          isActive ? "text-sky-400" : "text-gray-300"
        }`
      }
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
    </NavLink>
  );
}
