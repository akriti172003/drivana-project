import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Added useLocation for passing state
import { LogOut, User, LayoutDashboard, Cpu, ShieldCheck } from "lucide-react"; 
import { isLoggedIn, isAdmin, logout } from "../../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use your robust utility functions
  const authenticated = isLoggedIn();
  const isUserAdmin = isAdmin();
  const userName = localStorage.getItem("userName") || "Driver";

  const handleLogout = () => {
    logout(); // Uses your util to clear storage and redirect
  };

  // 🛡️ Helper function to intercept unauthorized clicks on premium links
  const handleProtectedNavigation = (e, path) => {
    if (!authenticated) {
      e.preventDefault(); // Stop default route change
      // Send user to login, but remember where they wanted to go!
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold tracking-tighter hover:scale-105 transition-transform flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-black text-lg">D</span>
          </div>
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            DRIVANA
          </span>
        </NavLink>

        {/* NAV LINKS */}
        <div className="flex gap-8 text-[13px] font-bold items-center">
          <NavItem to="/">Home</NavItem>
          
          {/* Protected Compare Link */}
          <NavItem 
            to="/compare" 
            onClick={(e) => handleProtectedNavigation(e, "/compare")}
          >
            Compare
          </NavItem>
          
          {/* Protected E-Challan Link */}
          <NavItem 
            to="/e-challan"
            onClick={(e) => handleProtectedNavigation(e, "/e-challan")}
          >
            <span className="flex items-center gap-1.5">
              E-Challan
              <span className="flex items-center gap-0.5 text-[9px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded-md border border-sky-500/20 uppercase tracking-tighter font-black">
                <Cpu size={10} /> AI
              </span>
            </span>
          </NavItem>

          <NavItem to="/contact">Contact</NavItem>

          {/* 🛡️ ADMIN PANEL - Visible only if authenticated AND isAdmin */}
          {authenticated && isUserAdmin && (
            <NavLink
              to="/admin"
              className="flex items-center gap-2 text-yellow-400 font-bold border border-yellow-400/20 px-4 py-2 rounded-xl bg-yellow-400/5 hover:bg-yellow-400/10 transition-all shadow-[0_0_20px_rgba(250,204,21,0.05)] group"
            >
              <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
              Admin Panel
            </NavLink>
          )}

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            {authenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Welcome</span>
                  <span className="text-xs text-white">{userName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="group flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2.5 rounded-xl border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all cursor-pointer font-bold"
                >
                  <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Logout
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                state={{ from: location.pathname }} // Save current page state when explicitly clicking Login
                className="flex items-center gap-2 bg-sky-600 text-white px-6 py-2.5 rounded-xl hover:bg-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all font-bold"
              >
                <User size={16} />
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Custom NavItem Component for consistent styling
 */
function NavItem({ to, children, className = "", onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick} // Pass down the dynamic click handler
      className={({ isActive }) =>
        `relative pb-1 transition-all group flex items-center ${
          isActive ? "text-sky-400 active-nav" : "text-gray-400 hover:text-white"
        } ${className}`
      }
    >
      {children}
      {/* Animated Underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] bg-sky-400 transition-all duration-300 w-0 group-hover:w-full group-[.active-nav]:w-full shadow-[0_0_10px_rgba(14,165,233,0.8)]"></span>
    </NavLink>
  );
}