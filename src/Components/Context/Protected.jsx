import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null; // or a loader/spinner if you prefer

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
