// src/pages/Login.js
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import '../App.css';

const API_URL = "https://safeguard-backend-1-4rf1.onrender.com/api";

const Login = ({ onLogin, goToSignup }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      // Backend returns user object
      onLogin(data.user);
    } catch (err) {
      console.error(err);
      setError('Could not connect to server. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-input-label">
          Email
          <input
            className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-input-label">
          Password
          <input
            className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {error && (
          <p style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</p>
        )}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="auth-footer-text">
        Don&apos;t have an account?{' '}
        <span className="auth-footer-link" onClick={goToSignup}>
          Sign up
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;


