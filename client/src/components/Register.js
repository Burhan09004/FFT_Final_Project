import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
          <div className="auth-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">GoCart</span>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join thousands of happy shoppers today</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              👤 Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              🔒 Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              ✅ Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              "🚀 Create Account"
            )}
          </button>
        </form>

        <div className="auth-divider">
          <Link to="/login" className="auth-account-link">
            Already have an account?
          </Link>
        </div>

        <Link to="/login" className="auth-btn secondary">
          🔑 Sign In Instead
        </Link>

        <div className="auth-features">
          <div className="auth-feature">
            <span className="feature-icon">🎁</span>
            <span>Exclusive Deals</span>
          </div>
          <div className="auth-feature">
            <span className="feature-icon">⚡</span>
            <span>Fast Checkout</span>
          </div>
          <div className="auth-feature">
            <span className="feature-icon">💫</span>
            <span>Personalized Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;