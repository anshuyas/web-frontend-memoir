import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  // Sample Data (To Run Without Backend)
  useEffect(() => {
    setEntries([
      {
        _id: "1",
        title: "A Peaceful Forest Walk",
        content: "Today, I took a walk in the forest and enjoyed the calmness of nature...",
      },
      {
        _id: "2",
        title: "Gratitude List",
        content: "I am grateful for my family, fresh air, and the warm coffee I had this morning...",
        image: "",
      },
    ]);

    const prompts = [
      "Write about a moment that made you feel truly alive.",
      "Describe a place that brings you peace.",
      "What are you most grateful for today?",
      "Write a letter to your future self.",
      "What is something you’ve been avoiding, and why?",
    ];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

    setTimeout(() => setShowPrompt(false), 5000); // Hide prompt after 5 seconds
  }, []);

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <h2>Your Journal</h2>
        <nav>
          <Link to="/journal-entry" className="nav-link">New Entry</Link>
          <Link to="/analytics" className="nav-link">View Analytics</Link>
          <Link to="/calendar" className="nav-link">Explore Calendar</Link>
        </nav>
      </div>
      <div className="content-area">
        <header className="dashboard-header">
          {/* <img src={bearIcon} alt="Bear Icon" className="bear-icon" /> */}
          <h1>Welcome to Your Journal</h1>
        </header>
        {showPrompt && (
          <div className="writing-prompt-popup">
            <h2>Writing Prompt</h2>
            <p>{prompt}</p>
          </div>
        )}
        <div className="recent-entries">
          <h2>Recent Journal Entries</h2>
          {entries.length > 0 ? (
            <div className="entries-grid">
              {entries.map((entry) => (
                <div key={entry._id} className="entry-card">
                  <h3>{entry.title}</h3>
                  <p>{entry.content.substring(0, 100)}...</p>
                  {entry.image && <img src={entry.image} alt="Journal entry" className="entry-image" />}
                  <div className="entry-actions">
                    <Link to={`/journal-entry/${entry._id}`} className="edit-button">Edit</Link>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No entries found. Start by creating a new journal entry!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;