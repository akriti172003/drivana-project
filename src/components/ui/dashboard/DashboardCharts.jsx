import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", views: 400 },
  { month: "Feb", views: 600 },
  { month: "Mar", views: 500 },
  { month: "Apr", views: 800 },
  { month: "May", views: 750 }
];

export default function DashboardCharts() {
  return (
    <div className="mt-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Traffic Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#38bdf8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
