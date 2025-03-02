import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import axios from "axios"; // For API calls
import "../../styles/journalentry.css";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:4000";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const quillRef = useRef();
  const isEditing = !!id;

  useEffect(() => {
    if (!id) return; // Prevent fetching with invalid ID
  
    const fetchJournalEntry = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Access denied. Please log in.");
          navigate("/login");
          return;
        }
  
        const response = await axios.get(`/api/journals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
        setError(""); // Clear any previous errors
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch journal entry.");
        console.error("Fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJournalEntry();
  }, [id]); // Only re-run if `id` changes
  

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
      const data = { title, content: content.trim() };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (isEditing) {
        await axios.put(`/api/journals/${id}`, data, config);
        alert("Entry updated successfully!");
      } else {
        await axios.post("/api/journals", data, config);
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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Access denied. Please log in.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Entry deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to delete journal entry.");
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
            ref={quillRef}
            value={content}
            onChange={setContent}
            placeholder="Write your journal..."
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }],
                [{ align: [] }],
                ["image"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "color",
              "align",
              "image",
            ]}
            className="quill-editor"
          />
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {isEditing ? "Update Entry" : "Save Entry"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                Delete Entry
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalEntry;
