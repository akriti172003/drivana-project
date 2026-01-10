export default function AdminAddCar() {
  return (
    <>
      <h1 className="text-3xl neon-title mb-6">Add New Car</h1>

      <form className="glass-card p-6 max-w-xl space-y-4">
        <input className="w-full p-3 rounded bg-black border" placeholder="Car Name" />
        <input className="w-full p-3 rounded bg-black border" placeholder="Price" />
        <input className="w-full p-3 rounded bg-black border" placeholder="Engine" />
        <input className="w-full p-3 rounded bg-black border" placeholder="Mileage" />

        <button className="w-full py-3 bg-sky-400 text-black font-bold rounded">
          Save Car
        </button>
      </form>
    </>
  );
}
