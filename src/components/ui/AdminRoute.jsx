import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // 1. Get the values directly from localStorage
  const token = localStorage.getItem("token");
  const adminStatus = localStorage.getItem("isAdmin");

  // 2. Comprehensive check: Must have a token AND isAdmin must be "true"
  // Note: localStorage stores everything as strings, so we check for "true"
  const isAuthorized = token && adminStatus === "true";

  if (!isAuthorized) {
    // replace={true} prevents the user from hitting "back" to get into the admin panel
    return <Navigate to="/login" replace />;
  }

  return children;
}