import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/axiosInstance";
import logo from "../../assets/logo.png";
import "../../styles/register.css"; // Import the regular CSS file

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.post("/api/register", {
        firstName,
        lastName,
        username,
        email,
        password,
        // isAdmin,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      // Handle registration errors
    if (error.response && error.response.data) {
      alert(`Registration failed: ${error.response.data.message}`);
    } else {
      alert("Registration failed. Please try again.");
    }
    }
  };

  return (
    <div className="container">
      <div className="logoContainer">
        <img src={logo} alt="App logo" className="logo" />
      </div>

      <div className="formContainer">
        <div className="formWrapper">
          <h1 className="title">Welcome!</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            {/* <label className="checkboxLabel">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Register as Admin
            </label> */}

            <button type="submit" className="button">
              Register
            </button>
          </form>

          <p className="loginText">
            Already have an account?{" "}
            <a href="/login" className="loginLink">
              Login here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;