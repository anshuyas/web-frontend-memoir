import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import "../../styles/journalEntry.css"; // Custom styles

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  console.log("JournalEntry component rendered"); // Debugging

  // Fetch journal entry for editing
  useEffect(() => {
    if (id) {
      const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      const entry = entries.find((entry) => entry.id === id);
      if (entry) {
        setTitle(entry.title);
        setContent(entry.content);
        // Set image if needed
      }
      setIsEditing(true);
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const newEntry = {
      id: isEditing ? id : Date.now().toString(), // Use existing ID for edit or generate new one
      title,
      content,
      imageUrl: image ? URL.createObjectURL(image) : null, // Simulate image upload
    };

    if (isEditing) {
      // Update existing entry
      const updatedEntries = entries.map((entry) =>
        entry.id === id ? newEntry : entry
      );
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
      alert("Entry updated successfully!");
    } else {
      // Add new entry
      localStorage.setItem(
        "journalEntries",
        JSON.stringify([...entries, newEntry])
      );
      alert("Entry saved successfully!");
    }

    navigate("/dashboard");
  };

  // Handle delete entry
  const handleDelete = async () => {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    alert("Entry deleted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="journal-entry-page">
      {/* Header
      <header className="journal-header">
        <h1>My Journal</h1>
        <nav>
          <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </nav>
      </header> */}
      <div className="journal-entry-container">
        <h1>{isEditing ? "Edit Journal Entry" : "Create Journal Entry"}</h1>
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
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }],
                [{ 'align': [] }],
                ['image'],
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
            <button type="submit" className="submit-button">
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