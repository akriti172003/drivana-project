import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
