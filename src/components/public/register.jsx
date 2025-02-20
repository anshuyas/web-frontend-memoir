import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backg from "../../assets/backg.jpg";
import logo from "../../assets/logo.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/api/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
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
          padding: "30px",
          borderRadius: "30px",
          textAlign: "center",
          width: "400px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >

        <h1
        style={{
          fontFamily: "public sans",
          fontWeight: "bold",
          fontSize: "50px",
          color: "#5f432c",
        }}
        >Welcome!</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "90%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid black",
              backgroundColor: "transparent",}}
          />

          <button type="submit" 
          style={{
            width: "50%",
            padding: "12px",
            backgroundColor: "#5f432c",
            color: "white",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}>
            Register
          </button>
        </form>

        <p style={{color: "#5f432c"}}>
          Already have an account? <a href="/login"style={{color: "black", fontWeight: "bold"}}>
          Login here</a>.
        </p>
      </div>
    </div>
    </div>
  );
};

// Common styles for inputs and button
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#5f432c",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Register;
