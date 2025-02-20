import React from "react";
import { Link } from "react-router-dom";
import "../../styles/about.css";

const About = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f1e8", // Light beige background
        color: "#5f432c", // Soft brown text
        fontFamily: "'Georgia', serif",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
        About Memoir
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "800px", lineHeight: "1.4", marginBottom:"15px" }}>
        Memoir is a personal journaling app designed to help you document your thoughts, memories, 
        and experiences in a private and secure space.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "20px", marginBottom: "5px" }}>Key Features</h2>
      <ul style={{ listStyleType: "none", padding: "0", maxWidth: "700px", marginBottom:"15px" }}>
        <li style={{ fontSize: "18px", marginBottom: "5px" }}>
          <strong>🔒 Secure Journaling</strong>: Keep your entries private with user authentication.
        </li>
        <li style={{ fontSize: "18px", marginBottom: "5px" }}>
          <strong>🖼️ Rich Media Support</strong>: Add images to your journal entries.
        </li>
        <li style={{ fontSize: "18px", marginBottom: "5px" }}>
          <strong>📅 Calendar View</strong>: Organize and view your entries by date.
        </li>
        <li style={{ fontSize: "18px", marginBottom: "5px" }}>
          <strong>📱 Responsive Design</strong>: Access your journal from any device.
        </li>
      </ul>

      <h2 style={{ fontSize: "28px", marginTop: "20px", marginBottom: "5px" }}>Our Mission</h2>
      <p style={{ fontSize: "18px", maxWidth: "800px", lineHeight: "1.4", marginBottom: "15px" }}>
        Our mission is to provide a safe and intuitive platform for self-reflection and personal growth.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "20px", marginBottom: "5px" }}>Get Started</h2>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Start your journey today by{" "}
        <Link to="/register" style={{ color: "#9c6f47", textDecoration: "underline", fontWeight: "bold" }}>
          creating an account
        </Link>{" "}
        or{" "}
        <Link to="/login" style={{ color: "#9c6f47", textDecoration: "underline", fontWeight: "bold" }}>
          logging in
        </Link>
        .
      </p>
    </div>
  );
};

export default About;
