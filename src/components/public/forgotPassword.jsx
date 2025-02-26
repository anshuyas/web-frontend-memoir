import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      alert("Password reset link sent to your email.");
      navigate("/login"); // Redirect to login after submission
    } catch (error) {
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f1e8",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <img src={logo} alt="App logo" style={{ width: "100px" }} />
      </div>

      <div
        style={{
          backgroundColor: "#d7c9b1",
          padding: "50px",
          borderRadius: "30px",
          textAlign: "center",
          width: "450px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontWeight: "bold",
            fontSize: "26px",
            color: "#5f432c",
          }}
        >
          Forgot Password?
        </h1>
        <p style={{ color: "#5f432c", fontSize: "14px", marginBottom: "20px" }}>
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",
            }}
            onFocus={(e) => (e.target.style.border = "2px solid #5f432c")} // Dark brown border on focus
            onBlur={(e) => (e.target.style.border = "1px solid black")} // Reverts back when unfocused
          />
          <button
            type="submit"
            style={{
              width: "60%",
              padding: "12px",
              backgroundColor: "#5f432c",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Send Reset Link
          </button>
        </form>

        <p style={{ marginTop: "15px", color: "#5f432c" }}>
          Remember your password?{" "}
          <a
            href="/login"
            style={{ color: "black", textDecoration: "none" }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
