import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added Link
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  Users, Car as CarIcon, AlertCircle, TrendingUp, Plus, Trash2, Edit3, X, Database
} from "lucide-react"; // Added Edit3
import { getCars, addCar, deleteCar } from "../../../api/api";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [newCar, setNewCar] = useState({
    name: "", brand: "", price: "", engine: "1497 cc",
    mileage: "17 kmpl", fuel: "Petrol", transmission: "Manual",
    seating: "5", safety: "5 Star"
  });

  const trafficData = [
    { time: "09:00", users: 120 }, { time: "12:00", users: 340 },
    { time: "15:00", users: 280 }, { time: "18:00", users: 560 },
    { time: "21:00", users: 430 },
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data } = await getCars();
      setCars(data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getActualBrand = (car) => {
    if (car.brand) return car.brand;
    const n = car.name?.toLowerCase() || "";
    if (n.includes("creta") || n.includes("verna")) return "Hyundai";
    if (n.includes("nexon") || n.includes("harrier")) return "Tata";
    if (n.includes("thar") || n.includes("xuv")) return "Mahindra";
    return "Other";
  };

  const brandData = cars.reduce((acc, car) => {
    const rawBrand = getActualBrand(car);
    const brandName = rawBrand.charAt(0).toUpperCase() + rawBrand.slice(1).toLowerCase();
    const existing = acc.find(item => item.name === brandName);
    if (existing) { existing.count += 1; } 
    else { acc.push({ name: brandName, count: 1 }); }
    return acc;
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(newCar).forEach(key => formData.append(key, newCar[key]));
    
    // Append image file - Ensure the key matches your backend (usually 'image')
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await addCar(formData);
      setShowAddForm(false);
      setImageFile(null);
      setNewCar({ 
        name: "", brand: "", price: "", engine: "1497 cc", 
        mileage: "17 kmpl", fuel: "Petrol", transmission: "Manual", 
        seating: "5", safety: "5 Star" 
      });
      fetchInventory();
    } catch (err) {
      alert("Submission Failed. Check if the backend is running on port 5000.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently remove this vehicle?")) {
      try {
        await deleteCar(id);
        fetchInventory();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-white pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Systems Dashboard</h1>
            <p className="text-slate-400 mt-1">Drivana AI Platform Analytics</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95 font-semibold"
          >
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
            {showAddForm ? "Cancel" : "Add Vehicle"}
          </button>
        </div>

        {/* Add Vehicle Form Section */}
        {showAddForm && (
          <div className="mb-10 bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
              <Database size={22} /> Database Entry
            </h2>
            <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input type="text" placeholder="Brand" className="form-input" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} required />
              <input type="text" placeholder="Model" className="form-input" value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} required />
              <input type="text" placeholder="Price (e.g. 12 Lakh)" className="form-input" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} required />

              <div className="md:col-span-2 flex items-center gap-4 bg-[#020617] border border-slate-800 rounded-2xl p-2 pr-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="flex-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white cursor-pointer"
                />
              </div>

              <select className="form-input" value={newCar.fuel} onChange={e => setNewCar({...newCar, fuel: e.target.value})}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>

              <button type="submit" className="md:col-span-3 bg-blue-600 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 shadow-xl shadow-blue-900/20 mt-2 transition-all">
                Submit to Inventory
              </button>
            </form>
          </div>
        )}

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Users className="text-blue-400" />} title="Visitors" value="12,842" growth="+12%" />
          <StatCard icon={<CarIcon className="text-emerald-400" />} title="Inventory" value={cars.length} growth="Live" />
          <StatCard icon={<AlertCircle className="text-amber-400" />} title="Health" value="Optimal" growth="Stable" />
          <StatCard icon={<TrendingUp className="text-purple-400" />} title="AI Accuracy" value="94.2%" growth="+2%" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#0f172a]/50 border border-slate-800 p-8 rounded-[2.5rem]">
            <h3 className="text-lg font-bold mb-8 text-slate-300">Inventory by Brand</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={brandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0f172a]/50 border border-slate-800 p-8 rounded-[2.5rem]">
            <h3 className="text-lg font-bold mb-8 text-slate-300">Traffic (24h)</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={trafficData}>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={0.1} fill="#10b981" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vehicle Inventory Table */}
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/20 text-slate-500 text-xs uppercase tracking-[0.1em] font-semibold">
              <tr>
                <th className="px-8 py-5">Vehicle Model</th>
                <th className="px-8 py-5">Brand</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {cars.map((car) => (
                <tr key={car._id} className="group hover:bg-slate-800/30 transition-all duration-300">
                  <td className="px-8 py-6 font-semibold text-slate-200">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`http://localhost:5000/uploads/${car.image}`} 
                        alt="" 
                        className="w-10 h-7 rounded object-cover bg-slate-900 border border-slate-800"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }} 
                      />
                      <div 
                        style={{ display: 'none' }}
                        className="w-10 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-blue-400"
                      >
                        {car.name?.charAt(0).toUpperCase() || 'V'}
                      </div>
                      {car.name}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-400 text-xs uppercase font-bold tracking-wider">
                    {getActualBrand(car)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      {/* FIXED: Link added for Edit function */}
                      <Link 
                        to={`/admin/edit/${car._id}`} 
                        className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </Link>

                      <button 
                        onClick={() => handleDelete(car._id)} 
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        .form-input { 
          background: #020617; 
          border: 1px solid #1e293b; 
          border-radius: 16px; 
          padding: 14px; 
          color: white; 
          width: 100%; 
          outline: none; 
          transition: border 0.2s; 
        } 
        .form-input:focus { 
          border-color: #3b82f6; 
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ icon, title, value, growth }) => (
  <div className="bg-[#0f172a]/40 border border-slate-800 p-6 rounded-3xl group transition-all hover:border-slate-700">
    <div className="flex justify-between items-start mb-5">
      <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">{icon}</div>
      <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg">
        {growth}
      </span>
    </div>
    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</h4>
    <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
  </div>
);

export default AdminDashboard;