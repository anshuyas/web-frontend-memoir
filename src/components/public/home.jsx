import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/home.css";

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Logo in Top Left */}
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo" />
      </div>

      {/* Top Right Buttons */}
      <div className="top-right-buttons">
        <Link to="/login" className="top-button">Login</Link>
        <Link to="/register" className="top-button">Sign Up</Link>
      </div>

      {/* Centered Text Box */}
      <div className="centered-text-box">
        <h1>Find yourself in the pages <br /> of your own stories</h1>
      </div>

      {/* Bottom Navigation Bar */}
      <div className={`bottom-navbar ${showNavbar ? "" : "hide"}`}>
        <div className="nav-content">
          <h2>Memoir</h2>
          <div className="nav-links">
            <Link to="/dashboard">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>

        {/* Right - Contact Details */}
        <div className="contact-info">
          <p>ph: 977 9700937458</p>
          <p>email: memoir123@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Home;