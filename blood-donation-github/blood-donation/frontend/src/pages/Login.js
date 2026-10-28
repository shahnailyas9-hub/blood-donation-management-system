import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!role) {
    setError("Please select a role.");
    return;
  }

  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password,
        role
      }
    );

    alert(response.data.message);

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    if (response.data.user.role === "Admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/donor-dashboard");
    }

  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed."
    );
  }
};

  return (
    <div className="login-page">
      <div className="auth-card">
        {/* Left branded panel */}
        <div className="side-panel">
          <div className="side-brand">
            <div className="mark">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C12 2 5 11 5 15.5C5 19.09 8.13 22 12 22C15.87 22 19 19.09 19 15.5C19 11 12 2 12 2Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div>
              <div className="name">LifeCare</div>
              <div className="sub">Blood Donation Center</div>
            </div>
          </div>

          <div className="side-art">
            <div className="drop-wrap">
              <svg viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="dropGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E23A54" />
                    <stop offset="100%" stopColor="#8A1626" />
                  </linearGradient>
                </defs>
                <path
                  d="M100 15 C100 15 40 100 40 140 C40 173.14 66.86 190 100 190 C133.14 190 160 173.14 160 140 C160 100 100 15 100 15 Z"
                  fill="url(#dropGrad)"
                />
                <path
                  d="M70 130 C70 130 78 150 100 150"
                  stroke="rgba(255,255,255,.4)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <h2>Welcome back</h2>
            <p>Sign in to manage donations, appointments, and save more lives with LifeCare.</p>
          </div>

          <div className="side-stats">
            <div>
              <div className="n">12,400+</div>
              <div className="l">Donations made</div>
            </div>
            <div>
              <div className="n">150+</div>
              <div className="l">Active donors</div>
            </div>
            <div>
              <div className="n">24/7</div>
              <div className="l">Support</div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="form-panel">
          <div className="form-head">
            <div>
              <h1>Sign in to your account</h1>
              <p>Enter your details to continue.</p>
            </div>
            <div className="switch-link">
              New here?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register"); }}>
                Register
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="form-error">{error}</div>}

            <div className="field">
              <label htmlFor="role">Role</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <select
                  id="role"
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select your role</option>
                  <option value="Donor">Donor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="row-between">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a
                className="forgot"
                href="#"
                onClick={(e) => { e.preventDefault(); navigate("/forgot-password"); }}
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>

          <div className="divider">or</div>

          <p className="helper-note">
            Need help signing in?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}