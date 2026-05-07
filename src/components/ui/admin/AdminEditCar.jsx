import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Image as ImageIcon, Loader2, Gauge, Settings, Users as UsersIcon } from "lucide-react";
import { fetchCarById, updateCar } from "../../../api/api";

const AdminEditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  
  const [carData, setCarData] = useState({
    name: "", 
    brand: "", 
    price: "", 
    engine: "1497 cc",
    mileage: "17 kmpl", 
    fuel: "Petrol", 
    transmission: "Manual", // Must match backend Enum exactly
    seating: "5", 
    safety: "5 Star"
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await fetchCarById(id);
        setCarData({
          name: data.name || "",
          brand: data.brand || "",
          price: data.price || "",
          engine: data.engine || "1497 cc",
          mileage: data.mileage || "17 kmpl",
          fuel: data.fuel || "Petrol",
          transmission: data.transmission || "Manual",
          seating: data.seating || "5",
          safety: data.safety || "5 Star"
        });

        if (data.image) {
          setPreview(`http://localhost:5000/uploads/${data.image}`);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching car:", err);
        navigate("/admin/dashboard");
      }
    };
    fetchCar();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    // Append all fields to satisfy Backend Enum validation
    Object.keys(carData).forEach(key => {
        formData.append(key, carData[key]);
    });
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateCar(id, formData);
      alert("System Updated Successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Update failed:", err.response?.data);
      // This will now show the EXACT validation error if it fails again
      alert(`Error: ${err.response?.data?.error || "Check Transmission format"}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#020617]">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-white pt-24">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
          <ArrowLeft size={20} /> Back to Inventory
        </button>

        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-xl">
          <h1 className="text-3xl font-bold mb-10">Update Vehicle Specs</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Section */}
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
              {preview ? (
                <img src={preview} alt="Preview" className="w-72 h-44 object-cover rounded-2xl mb-4 border border-slate-700" />
              ) : (
                <ImageIcon size={48} className="text-slate-600 mb-4" />
              )}
              <label className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl cursor-pointer font-semibold">
                Upload New Image
                <input type="file" className="hidden" onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }} />
              </label>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Brand</label>
                <input name="brand" value={carData.brand} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Model</label>
                <input name="name" value={carData.name} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Price</label>
                <input name="price" value={carData.price} onChange={handleInputChange} className="form-input" required />
              </div>

              {/* Transmission - FIXES THE 400 ERROR */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Transmission</label>
                <select name="transmission" value={carData.transmission} onChange={handleInputChange} className="form-input">
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Fuel</label>
                <select name="fuel" value={carData.fuel} onChange={handleInputChange} className="form-input">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-2">Seating</label>
                <select name="seating" value={carData.seating} onChange={handleInputChange} className="form-input">
                  <option value="5">5 Seater</option>
                  <option value="7">7 Seater</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-blue-600 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-500 disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />}
              {saving ? "Processing..." : "Commit Changes"}
            </button>
          </form>
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
        } 
        .form-input:focus { border-color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default AdminEditCar;