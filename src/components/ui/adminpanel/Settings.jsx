import React from "react";

export default function Settings() {
  return (
    <div className="space-y-4">
      <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
        Clear Cache
      </button>
      <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
        Manage Admins
      </button>
      <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
        Update System
      </button>
    </div>
  );
}
