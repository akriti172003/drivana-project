import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft, Loader2, UserPlus, Eye, EyeOff } from "lucide-react"; // Added Eye & EyeOff icons
import API from "../../api/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Hit the register endpoint (standard user signup)
      const res = await API.post("/auth/register", formData);

      // 2. Auto-login after successful signup
      const { token, isAdmin, name } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin); 
      localStorage.setItem("userName", name);

      // 3. Smooth redirect to home
      navigate("/");
      window.location.reload();

    } catch (err) {
      console.error("Signup Error:", err);
      setError(
        err.response?.data?.message || 
        "Registration failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white relative overflow-hidden px-4">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />

      <form
        onSubmit={handleSignup}
        className="relative z-10 bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 w-full max-w-[440px] rounded-[2.5rem] border border-slate-800 shadow-2xl transition-all duration-500 hover:border-slate-700"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-sky-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
            <UserPlus className="text-sky-400 animate-pulse" size={30} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Join <span className="text-sky-400">Drivana</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">Start your premium car journey today</p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-3 animate-bounce">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" 
                size={18} 
              />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm text-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" 
                size={18} 
              />
              <input
                type="email"
                name="email"
                placeholder="driver@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm text-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password with eye toggle */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" 
                size={18} 
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-black/40 border border-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm text-white"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all text-white font-bold py-4 rounded-2xl mt-4 shadow-xl shadow-sky-500/20 active:scale-[0.98] flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" size={20} />
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-800/50 pt-6">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-400 font-bold hover:text-sky-300 transition-colors">
              Log In
            </Link>
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}