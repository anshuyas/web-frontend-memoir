import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "../../styles/journalentry.css";

axios.defaults.baseURL = "http://localhost:4000";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id; // Check if editing mode

  useEffect(() => {
    if (!isEditing) return;

    const fetchJournalEntry = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Access denied. Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get(`/api/journals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setTitle(response.data.title || ""); 
          setContent(response.data.content || ""); 
        } else {
          setError("Journal entry not found.");
        }
      } catch (err) {
        setError("Failed to fetch journal entry.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntry();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Access denied. Please log in.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const data = { title, content };

      if (isEditing) {
        await axios.put(`/api/journals/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Entry updated successfully!");
      } else {
        await axios.post("/api/journals", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Entry created successfully!");
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save journal entry.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journal-entry-page">
      <div className="journal-entry-container">
        <h1>{isEditing ? "Edit Journal Entry" : "Create Journal Entry"}</h1>
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="title-input"
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your journal..."
            className="quill-editor"
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {isEditing ? "Update Entry" : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JournalEntry;
