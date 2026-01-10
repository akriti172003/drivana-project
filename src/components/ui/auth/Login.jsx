import React, { useState } from "react";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      alert("Login successful!");
      localStorage.setItem("isAdmin", true);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="backdrop-blur-xl bg-white/5 p-10 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-300">Email</span>
            <input
              type="email"
              className="w-full mt-2 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-300">Password</span>
            <input
              type="password"
              className="w-full mt-2 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
