import React from "react";

export default function Users() {
  const logs = [
    "• User compared Creta vs Nexon",
    "• New login from Delhi",
    "• Viewed details for Mahindra XUV700",
    "• User added Swift to compare list",
  ];

  return (
    <ul className="space-y-2 text-gray-300">
      {logs.map((item, i) => (
        <li key={i} className="text-sm bg-white/5 p-2 rounded-md">
          {item}
        </li>
      ))}
    </ul>
  );
}
