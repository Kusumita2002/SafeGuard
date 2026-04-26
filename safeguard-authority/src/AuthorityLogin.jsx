// src/AuthorityLogin.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthorityLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  // if already logged in, go straight to dashboard, else focus input
  useEffect(() => {
    const loggedIn = localStorage.getItem("sg_authority_logged_in");
    if (loggedIn === "true") {
      navigate("/authority/dashboard", { replace: true });
    } else if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password === process.env.REACT_APP_AUTH_PASSWORD) {
      localStorage.setItem("sg_authority_logged_in", "true");
      navigate("/authority/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020b23",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>
          SafeGuard Authority Access
        </h1>
        <p style={{ marginBottom: "1.5rem", color: "#cbd5f5" }}>
          Enter your secure access password.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.4rem 0.6rem",
              marginRight: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #4b5563",
              minWidth: "220px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "4px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Enter dashboard
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: "0.75rem",
              color: "#fca5a5",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorityLogin;
