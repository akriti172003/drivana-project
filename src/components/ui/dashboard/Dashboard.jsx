import React from "react";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";

export default function Dashboard() {
  return (
    <div className="flex bg-black text-white min-h-screen">

      {/* Sidebar (sticky) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-10 py-10 mt-16 overflow-y-auto">
        {/* mt-16 ensures heading is BELOW navbar */}
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-1">Overview</h1>
          <p className="text-gray-400">System analytics — FAANG-grade UI</p>
        </header>

        <DashboardCards />

        <section className="mt-12">
          <DashboardCharts />
        </section>
      </main>
    </div>
  );
}
