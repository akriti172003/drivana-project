import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../../utils/auth";

export default function ProtectedRoute({ children }) {
  // If not logged in, send them to login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, let them see the content
  return children;
}