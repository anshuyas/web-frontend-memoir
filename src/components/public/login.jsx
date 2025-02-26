import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import axios from "axios";
import "../../styles/login.css"; // Import the CSS file
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token for authentication
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      
       // Show backend error message if available
    if (error.response?.data?.message) {
      alert(`Login failed: ${error.response.data.message}`);
    } else {
      alert("Login failed. Please try again.");
    }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="App logo" className="logo" />
      </div>

      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="form-title">Welcome Back!</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />

            {/* Forgot Password link */}
            <div className="password-link">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <a href="/register" className="signup-link">
              Sign Up
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;