import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/authContext.jsx";

export default function AuthGuard({ children }) {
  const { user, loading } = UserAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/signin" />;

  return children;
}
