// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthorityLogin from "./AuthorityLogin";
import AuthorityDashboard from "./AuthorityDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/authority" replace />} />
        <Route path="/authority" element={<AuthorityLogin />} />
        <Route
          path="/authority/dashboard"
          element={
            <ProtectedRoute>
              <AuthorityDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
