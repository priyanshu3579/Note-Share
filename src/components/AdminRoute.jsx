import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <Navigate to="/" />;

  if (!user) return <div>Loading...</div>;

  const roles = user?.["https://noteshare.com/roles"] || [];
  const isAdmin = roles.includes("admin");

  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
