// src/components/AuthLayout.js
import React from 'react';
import '../App.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">SafeGuard</h1>
        <p className="auth-subtitle">AI-Powered Citizen Safety Platform</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
