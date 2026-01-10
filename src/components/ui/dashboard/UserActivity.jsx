export default function UserActivity() {
  const logs = [
    "User compared Creta vs Nexon",
    "New login from Delhi",
    "Viewed Mahindra XUV700",
    "Added Swift to compare list",
  ];

  return (
    <div className="mt-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent User Activity</h2>

      <ul className="text-gray-300 space-y-3 text-sm">
        {logs.map((log, i) => (
          <li key={i}>• {log}</li>
        ))}
      </ul>
    </div>
  );
}
