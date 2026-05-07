import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // 1. If no token, they aren't logged in at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If they have a token but aren't an admin, kick them to home (or a forbidden page)
  if (!isAdmin) {
    console.warn("Unauthorized access attempt to Admin Route");
    return <Navigate to="/" replace />;
  }

  // 3. If both pass, show the dashboard
  return children;
}