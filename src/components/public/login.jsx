import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "../../styles/login.css"; // Import the CSS file
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:4000/api/login", { email, password });
      const { token, user } = response.data;

      // Store token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set token in axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login successful!");

      // Admin demo credentials check
      if (email === "admin@example.com" && password === "Admin@123") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      
       // Show backend error message if available
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("Login failed. Please try again.");
    }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />

            {/* Toggle password visibility button */}
            <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Show error message */}
            {error && <p className="error-message">{error}</p>}

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