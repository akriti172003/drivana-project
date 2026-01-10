import React from "react";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-gray-300 text-center mb-6">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
