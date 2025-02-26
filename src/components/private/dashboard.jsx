import { useState } from "react";
import {
  FaPlus,
  FaChartBar,
  FaCalendar,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaPalette,
  FaUserEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("theme"); // "theme" or "profile"
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true); // Show the settings modal
    setProfileDropdown(false); // Close the profile dropdown
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Implement theme change logic here (e.g., apply the theme to the app)
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false); // Close the settings modal
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <a href="/journal-entry" className="nav-item">
            <FaPlus className="icon" />
            <span>New Entry</span>
          </a>
          <a href="/analytics" className="nav-item">
            <FaChartBar className="icon" />
            <span>View Analytics</span>
          </a>
          <a href="/calendar" className="nav-item">
            <FaCalendar className="icon" />
            <span>Calendar</span>
          </a>
          <a href="/search" className="nav-item">
            <FaSearch className="icon" />
            <span>Search</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="app-title">Memoir</h1>

          {/* Profile Dropdown */}
          <div className="profile-section" onClick={toggleProfileDropdown}>
            <FaUserCircle className="profile-icon" />
            <FaChevronDown className="dropdown-icon" />
            {profileDropdown && (
              <div className="dropdown-menu">
                <p className="username">Anshuyas</p>
                <p className="email">asy@example.com</p>
                <hr />
                <button className="dropdown-item" onClick={handleSettingsClick}>
                  Settings
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Journal Section */}
        <section className="journal-section">
          <h2>Recent Journals</h2>
          <p>No recent journal entries found.</p>
        </section>
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <h2>Settings</h2>
            <button className="close-modal-button" onClick={closeSettingsModal}>
              &times;
            </button>

            {/* Icon Tabs */}
            <div className="icon-tabs">
              <button
                className={`icon-tab ${activeTab === "theme" ? "active" : ""}`}
                onClick={() => setActiveTab("theme")}
              >
                <FaPalette className="icon" />
                <span>Theme</span>
              </button>
              <button
                className={`icon-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUserEdit className="icon" />
                <span>Profile</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "theme" && (
                <div className="settings-option">
                  <label>Color Theme</label>
                  <select value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="settings-option">
                  <label>Username</label>
                  <input type="text" placeholder="Enter new username" />
                  <label>Email</label>
                  <input type="email" placeholder="Enter new email" />
                  <label>Old Password</label>
                  <input type="email" placeholder="Enter old password" />
                  <label>New Password</label>
                  <input type="email" placeholder="Enter new password" />
                  <label>Confirm New Password</label>
                  <input type="email" placeholder="Confirm new password" />
                  <button
                    className="save-button"
                    onClick={() => alert("Profile updated!")}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;