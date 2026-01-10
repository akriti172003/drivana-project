import React from "react";

export default function StatsCards() {
  const stats = [
    { label: "Total Cars", value: "12", color: "text-sky-400" },
    { label: "Daily Visits", value: "4,580", color: "text-green-400" },
    { label: "Comparisons", value: "920", color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg"
        >
          <p className="text-gray-300 text-sm">{stat.label}</p>
          <h3 className={`text-3xl font-bold mt-2 ${stat.color}`}>
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
