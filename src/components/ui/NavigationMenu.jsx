import { Link } from "react-router-dom";

export default function NavigationMenu() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur z-50 px-10 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-cyan-400">Drivana</h1>

      <div className="flex gap-6 text-sm">
        <Link to="/">Home</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
