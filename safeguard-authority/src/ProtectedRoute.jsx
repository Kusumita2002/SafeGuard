// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("sg_authority_logged_in") === "true";

  if (!loggedIn) {
    return <Navigate to="/authority" replace />;
  }

  return children;
};

export default ProtectedRoute;
