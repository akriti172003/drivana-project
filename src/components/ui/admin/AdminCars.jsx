import { carDetails } from "../../../data/carDetails";

export default function AdminCars() {
  const cars = Object.keys(carDetails);

  return (
    <>
      <h1 className="text-3xl neon-title mb-6">Manage Cars</h1>

      <div className="grid grid-cols-2 gap-6">
        {cars.map((name) => (
          <div key={name} className="glass-card p-4">
            <h3 className="font-semibold">{name}</h3>
            <div className="mt-3 flex gap-3">
              <button className="px-4 py-2 bg-yellow-400 text-black rounded">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
