import React from "react";

export default function Dashboard() {
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6 pb-20">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Manage cars, users & platform analytics
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Cars", value: "10" },
          { title: "Total Users", value: "124" },
          { title: "Comparisons", value: "980" },
          { title: "Active Sessions", value: "32" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-3xl font-bold text-sky-400 mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Activity
        </h2>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• User compared Creta vs Nexon</li>
          <li>• Admin added new car: XUV700</li>
          <li>• User logged in from Delhi</li>
          <li>• User viewed Thar details</li>
        </ul>
      </div>

    </div>
  );
}
