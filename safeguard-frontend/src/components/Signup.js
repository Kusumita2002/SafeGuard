// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import '../App.css';

const API_URL = "https://safeguard-backend-1-4rf1.onrender.com/api";

const Signup = ({ onSignup, goToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    emergencyContacts: '',
  });
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!agree) {
      setMessage('You must agree to Terms & Conditions to continue.');
      return;
    }

    setSubmitting(true);
    try {
      const userData = {
        ...formData,
        emergencyContacts: formData.emergencyContacts
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c),
      };

      const response = await axios.post(`${API_URL}/signup`, userData);

      if (response.data.success) {
        setMessage('Account created successfully! Please login.');
        if (onSignup) onSignup(); // App.js will switch to login mode
      } else {
        setMessage(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Signup failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h2 style={{ marginBottom: 8 }}>Join SafeGuard</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-input-label">
          Full name
          <input
            className="auth-input"
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </label>

        <label className="auth-input-label">
          Email
          <input
            className="auth-input"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
        </label>

        <label className="auth-input-label">
          Password
          <input
            className="auth-input"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            required
          />
        </label>

        <label className="auth-input-label">
          Phone number
          <input
            className="auth-input"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            required
          />
        </label>

        <label className="auth-input-label">
          Emergency contacts (comma separated)
          <input
            className="auth-input"
            type="text"
            value={formData.emergencyContacts}
            onChange={handleChange('emergencyContacts')}
            placeholder="9876..., 9123..."
          />
        </label>

        <label className="auth-terms">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>
            I agree to SafeGuard Terms &amp; Conditions and consent to the use
            of my camera, microphone and location only when I press EMERGENCY
            SOS.
          </span>
        </label>

        {message && (
          <p style={{ fontSize: 12, marginTop: 4, color: '#b91c1c' }}>
            {message}
          </p>
        )}

        <button type="submit" className="auth-button" disabled={submitting}>
          {submitting ? 'Signing up...' : 'Sign up'}
        </button>
      </form>

      <p className="auth-footer-text">
        Already have an account?{' '}
        <span className="auth-footer-link" onClick={goToLogin}>
          Log in
        </span>
      </p>
    </AuthLayout>
  );
};

export default Signup;
