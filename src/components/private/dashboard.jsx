import { useState, useEffect } from "react";
import {
  FaPlus,
  FaChartBar,
  FaCalendar,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get("http://localhost:4000/api/journals/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.entries)) {
          setJournalEntries(response.data.entries);
        } else {
          throw new Error("Invalid journal entries format");
        }
      } catch (err) {
        console.error("Error fetching journal entries:", err.response?.data || err.message);
        setError("Failed to fetch journal entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleViewAnalytics = () => {
    navigate("/view-analytics"); 
  };

  const handleEdit = (entry) => {
    navigate("/journal-entry", { state: { entry } });
  };  

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <a href="/journal-entry" className="nav-item">
            <FaPlus className="icon" /> <span>New Entry</span>
          </a>
          <a href="/view-analytics" className="nav-item">
            <FaChartBar className="icon" /> <span>View Analytics</span>
          </a>
          <a href="/calendar" className="nav-item">
            <FaCalendar className="icon" /> <span>Calendar</span>
          </a>
          <a href="/search" className="nav-item">
            <FaSearch className="icon" /> <span>Search</span>
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="app-title">Memoir</h1>
          <div className="profile-section" onClick={() => setProfileDropdown(!profileDropdown)}>
            <FaUserCircle className="profile-icon" />
            <FaChevronDown className="dropdown-icon" />
            {profileDropdown && (
              <div className="dropdown-menu">
                {user && <><p className="username">{user.username}</p><p className="email">{user.email}</p><hr /></>}
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        <section className="journal-section">
          <h2>Recent Journals</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : journalEntries.length > 0 ? (
            <div className="journal-entries">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="journal-entry">
                  <h3>{entry.title || "Untitled Entry"}</h3>
                  <p>{entry.content.substring(0, 100)}...</p>
                  <small>{new Date(entry.createdAt).toLocaleDateString()}</small>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button onClick={async () => {
                    if (!window.confirm("Are you sure you want to delete this entry?")) return;
                    try {
                      await axios.delete(`http://localhost:4000/api/journals/${entry.id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                      });
                      setJournalEntries(journalEntries.filter(j => j.id !== entry.id));
                    } catch (error) {
                      console.error("Failed to delete entry:", error);
                    }
                  }}>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent journal entries found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;