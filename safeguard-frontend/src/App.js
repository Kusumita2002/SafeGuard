// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'dashboard'
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setMode('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setMode('login');
  };

  return (
    <>
      {mode === 'login' && (
        <Login
          onLogin={handleLogin}
          goToSignup={() => setMode('signup')}
        />
      )}

      {mode === 'signup' && (
        <Signup
          onSignup={() => setMode('login')}
          goToLogin={() => setMode('login')}
        />
      )}

      {mode === 'dashboard' && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
