import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
    return null;
  }

  return children;
};

export default ProtectedRoute;
