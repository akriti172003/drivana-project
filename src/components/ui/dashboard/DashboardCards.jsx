export default function DashboardCards() {
  const cards = [
    { title: "Total Cars", value: "12", color: "text-sky-400" },
    { title: "Daily Visits", value: "4,580", color: "text-purple-400" },
    { title: "Compare Requests", value: "920", color: "text-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl 
          hover:bg-white/10 transition shadow-[0_0_20px_rgba(0,255,255,0.15)]"
        >
          <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
          <p className={`text-4xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}
