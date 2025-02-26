import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/settings.css"; // Ensure this file is updated with the new styles

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Implement theme change logic here
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        // Delete account from the backend
        alert("Account deleted successfully!");
        navigate("/login");
      } catch (error) {
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Security</h2>
        <button className="settings-button" onClick={() => navigate("/change-password")}>
          Change Password
        </button>
        <button className="settings-button" onClick={() => navigate("/two-factor-auth")}>
          Two-Factor Authentication
        </button>
      </div>

      <div className="settings-section">
        <h2>Billing</h2>
        <p>Current Plan: Free</p>
        <button className="settings-button" onClick={() => navigate("/upgrade-plan")}>
          Upgrade Plan
        </button>
      </div>

      <div className="settings-section">
        <h2>Affiliate</h2>
        <button className="settings-button" onClick={() => navigate("/affiliate-center")}>
          Affiliate Center
        </button>
      </div>

      <div className="settings-section">
        <h2>Theme</h2>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>Account</h2>
        <button className="delete-button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;