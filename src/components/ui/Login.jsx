import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Added useLocation
import { User, Lock, ArrowLeft, Loader2, LogIn, Eye, EyeOff } from "lucide-react"; 
import API from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // Location hook to grab redirect path

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Authenticate with your MERN backend
      const res = await API.post("/auth/login", { email, password });

      // 2. Destructure the dynamic role and token from backend
      const { token, isAdmin, name } = res.data;

      // 3. Store session data
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin); 
      localStorage.setItem("userName", name);

      // 4. Smooth Dynamic Redirect Logic
      // Check if user was forced to login from another page (e.g., /compare)
      const redirectPath = location.state?.from || (isAdmin ? "/admin" : "/");
      navigate(redirectPath);

      // 5. Global state refresh to update navbar immediately
      window.location.reload();
      
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || 
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-slate-900/40 backdrop-blur-xl p-10 w-[420px] rounded-[2rem] border border-slate-800 shadow-2xl transition-all duration-500 hover:border-slate-700"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-sky-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
            <LogIn className="text-sky-400 animate-pulse" size={30} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Drivana <span className="text-sky-400">Portal</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">Access your personalized dashboard</p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-3 animate-bounce">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-6">
          {/* Email Address */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-400 transition-colors" 
                size={18} 
              />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password with Eye Toggle */}
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
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-black/40 border border-slate-800 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Verifying Credentials...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-slate-800/50 pt-8">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            {/* We pass the same redirect state to Signup so even signups can redirect back */}
            <Link 
              to="/signup" 
              state={location.state} 
              className="text-sky-400 font-bold hover:text-sky-300 transition-colors"
            >
              Create one
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