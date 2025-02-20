import React from "react";
import { Link } from "react-router-dom";
import journal from "../../assets/journal.png";
import logo from "../../assets/logo.png";
import "../../styles/home.css";

const Home = () => {
  return (
    <div
  style={{
    backgroundImage: `url(${journal})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  }}
>

{/* Top Right Buttons */}
<div
        style={{
          position: "absolute",
          top: "20px",
          right: "60px",
          display: "flex",
          gap: "20px",
          fontSize: "20px",
        }}
      >
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#5f432c",
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "#5f432c",
          }}
        >
          Sign Up
        </Link>
      </div>

{/* Centered Text Box */}
<div
        style={{
          backgroundColor: "#f6f4f1", // Transparent white background
          padding: "100px 150px",
          borderRadius: "5px",
          textAlign: "center",
          border: "1px solid black", // Soft border
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "30px", fontWeight: "700", color: "#5f432c" }}>
          Find yourself in the pages 
          <br />of your own stories 
        </h1>
      </div>

      {/* Bottom Navigation Bar */}
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "0",
          backgroundColor: "white",
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Soft top shadow
        }}
      >
        {/* Left Side - Logo & Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#5f432c" }}>
            Memoir
          </h2>
          <div   style={{ display: "flex", gap: "30px", fontSize: "14px", color: "#5f432c" }}>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "#5f432c" }}>
              HOME
            </Link>
            <Link to="/about" style={{ textDecoration: "none", color: "#5f432c" }}>
              ABOUT
            </Link>
            <Link to="/terms" style={{ textDecoration: "none", color: "#5f432c" }}>
              Terms & Conditions
            </Link>
          </div>
        </div>

         {/* Right - Contact Details */}
         <div style={{ fontSize: "14px", color: "#5f432c", textAlign: "right" }}>
          <p>ph: 977 9700937458</p>
          <p>email: memoir123@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Home;