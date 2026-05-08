import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Trash2, Shield, Gauge, Fuel, Zap, Activity, 
  ChevronRight, Users, Sparkles, Box, Wind, 
  Settings, Timer, Lock 
} from "lucide-react";
// 🔄 Modified from "./Navbar" to "../Navbar" to step out of the 'ui' directory
import Navbar from "../Navbar";

export default function ComparePage() {
  const [cars, setCars] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🔑 Auth Guard: Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // Load cars if authorized
    const stored = localStorage.getItem("compareCars");
    if (stored) {
      const parsed = JSON.parse(stored);
      const unique = Array.from(new Map(parsed.map(c => [c._id || c.name, c])).values());
      setCars(unique);
    }
  }, []);

  const getStatLimit = (field) => {
    if (cars.length < 2) return { max: null, min: null };
    const values = cars.map(c => parseFloat(c[field]) || 0);
    return { max: Math.max(...values), min: Math.min(...values) };
  };

  // Expanded limits for visual highlights
  const limits = { 
    bhp: getStatLimit('bhp'), 
    price: getStatLimit('price'),
    mileage: getStatLimit('mileage'),
    topSpeed: getStatLimit('topSpeed')
  };

  // 🚨 Scenario 1: User is not Logged In (Show Login Prompt Screen)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-white px-4">
        <div className="text-center max-w-md relative z-10 bg-slate-900/30 p-12 rounded-[3rem] border border-white/5 backdrop-blur-xl">
          <div className="bg-blue-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <Lock size={36} className="text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">
            Security <span className="text-blue-500">Shield</span>
          </h2>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed">
            Please login or sign up to access the comparison dashboard. Your data workspace requires active system authorization.
          </p>
          <button 
            onClick={() => navigate("/login", { state: { from: location.pathname } })} 
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Authenticate Portal
          </button>
        </div>
      </div>
    );
  }

  // 🚗 Scenario 2: No cars selected for comparison
  if (!cars.length) return <EmptyMatrix />;

  return (
    <div className="min-h-screen bg-[#02040a] text-white pb-32">
      <Navbar />
      <div className="max-w-[1700px] mx-auto px-8 pt-44">
        
        <div className="flex justify-between items-end mb-20 border-b border-white/5 pb-16">
          <div>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">Analysis Engine</span>
            <h1 className="text-9xl font-black italic uppercase tracking-tighter">The Matrix</h1>
          </div>
          <button 
            onClick={() => { 
              localStorage.removeItem("compareCars"); // Clears workspace
              window.location.reload(); 
            }} 
            className="px-12 py-6 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
          >
             Wipe Workspace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cars.map((car, i) => {
            const isPower = parseFloat(car.bhp) === limits.bhp.max;
            const isValue = parseFloat(car.price) === limits.price.min;
            const isEfficient = parseFloat(car.mileage) === limits.mileage.max;

            // 🖼️ DYNAMIC IMAGE BASE URL SYNC
            const imageBaseURL = "https://drivana-project-1.onrender.com";
            const imageSrc = car.image?.startsWith("http")
              ? car.image
              : `${imageBaseURL}/uploads/${car.image}`;

            return (
              <div key={car._id || i} className="bg-[#080c14] border border-white/5 rounded-[4rem] overflow-hidden group hover:border-blue-500/40 transition-all duration-700">
                {/* Image Section */}
                <div className="h-80 relative overflow-hidden bg-black">
                  <img 
                    src={imageSrc} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                    alt={car.name} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400&h=300";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent" />
                  
                  <div className="absolute top-10 left-10 flex flex-col gap-2">
                    {isPower && <Badge color="bg-blue-600" text="Power King" icon={<Zap size={10} />} />}
                    {isEfficient && <Badge color="bg-orange-500 text-black" text="Eco Leader" icon={<Wind size={10} />} />}
                    {isValue && <Badge color="bg-emerald-500 text-black" text="Best Value" icon={<Sparkles size={10} />} />}
                  </div>

                  <div className="absolute bottom-10 left-12">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">{car.brand}</p>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">{car.name}</h2>
                  </div>
                </div>

                {/* Expanded Comparison Features */}
                <div className="p-12 space-y-1">
                  <SpecRow icon={<Fuel size={14}/>} label="Fuel Type" value={car.fuel || car.fuelType} />
                  <SpecRow icon={<Settings size={14}/>} label="Engine" value={car.engine?.includes("cc") ? car.engine : `${car.engine || "1197"} cc`} />
                  <SpecRow icon={<Gauge size={14}/>} label="BHP" value={car.bhp ? `${car.bhp} BHP` : "—"} highlight={isPower} percent={(parseFloat(car.bhp)/400)*100} />
                  <SpecRow icon={<Activity size={14}/>} label="Torque" value={car.torque?.includes("Nm") ? car.torque : `${car.torque || "150"} Nm`} />
                  <SpecRow icon={<Timer size={14}/>} label="Top Speed" value={car.topSpeed ? `${car.topSpeed} km/h` : "210 km/h"} highlight={parseFloat(car.topSpeed) === limits.topSpeed.max} />
                  <SpecRow icon={<Wind size={14}/>} label="Mileage" value={car.mileage} highlight={isEfficient} />
                  <SpecRow icon={<Box size={14}/>} label="Gearbox" value={car.transmission} />
                  <SpecRow icon={<Users size={14}/>} label="Capacity" value={car.seating || car.seats || "5 Seated"} />
                  <SpecRow icon={<Shield size={14}/>} label="Safety" value={car.safety || car.safetyRating || "5 Star"} highlight />
                  
                  {/* Price Section */}
                  <div className="pt-12 mt-6 border-t border-white/5">
                    <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-1 hover:bg-blue-500/5 transition-colors">
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Ex-Showroom Estimate</span>
                      <p className="text-3xl font-black text-white">
                        {/* 💎 100% Solid Lakh Pricing Formatting */}
                        {car.price ? `₹${car.price} Lakh` : "Price on Request"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Sub-components with minor layout polish
function SpecRow({ icon, label, value, highlight, percent }) {
  return (
    <div className="py-3 border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors rounded-lg px-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-4 text-slate-500">
          <span className="text-blue-500/70 group-hover:text-blue-500 transition-colors">{icon}</span>
          <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className={`text-[11px] font-black ${highlight ? 'text-blue-400' : 'text-slate-300'}`}>{value || "—"}</span>
      </div>
      {percent && (
        <div className="h-[1px] w-full bg-white/5 mt-2">
          <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
      )}
    </div>
  );
}

function Badge({ color, text, icon }) {
  return <div className={`${color} flex items-center gap-2 px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md`}>{icon}{text}</div>;
}

function EmptyMatrix() {
  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-white">
      <div className="text-center">
        <Zap size={60} className="mx-auto mb-8 text-blue-600 animate-pulse" />
        <h2 className="text-4xl font-black italic uppercase mb-10 tracking-tighter opacity-20 text-blue-500">Matrix Offline</h2>
        <button onClick={() => window.location.href = '/'} className="px-16 py-7 bg-blue-600 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 hover:scale-105 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)]">Initialize System</button>
      </div>
    </div>
  );
}