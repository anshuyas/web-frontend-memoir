import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backg from "../../assets/backg.jpg";
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "210vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        // flexDirection: "column",
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
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "10%",
        }}
      >
        <div
        style={{
          backgroundColor: "#d7c9b1",
          padding: "50px",
          height: "60vh",
          borderRadius: "30px",
          textAlign: "center",
          width: "350px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
      
      <h1
        style={{
          fontFamily: "public sans",
          fontWeight: "bold",
          fontSize: "30px",
          color: "#5f432c",
        }}
      >Welcome Back!</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            marginTop: "40px",
            borderRadius: "12px",
            border: "1px solid black",
            backgroundColor: "transparent",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            marginTop: "25px",
            borderRadius: "12px",
            border: "1px solid black",
            backgroundColor: "transparent",
          }}
        />

        {/* Forgot Password link placed outside the password box */}
        <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-5px", // Adjust spacing
                marginBottom: "30px", // Space before login button
              }}
            >
              <a
                href="/forgot-password"
                style={{
                  fontSize: "12px",
                  color: "#5f432c",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Forgot Password?
              </a>
            </div>

        <button type="submit"
        style={{
            width: "50%",
            padding: "12px",
            marginTop: "30px",
            backgroundColor: "#5f432c",
            color: "white",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}>
            Login
            </button>
      </form>
      <p style={{marginTop: "15px", color: "#5f432c"}}>
        Don't have an account? <a href="/register" style={{color: "black", fontWeight: "bold"}}>
        Sign Up</a>.
      </p>
    </div>
    </div>
    </div>
  );
};

export default Login;