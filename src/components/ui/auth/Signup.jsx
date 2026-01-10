import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitSignup = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required!");
      return;
    }

    navigate("/login");
  };

  return (
    <AuthCard title="Create Account" subtitle="Get started with Autosense">
      <form onSubmit={submitSignup} className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </AuthCard>
  );
}
