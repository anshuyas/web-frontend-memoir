import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const journalEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/journal", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Entry saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to save entry.");
    }
  };

  return (
    <div className="journal-entry-container">
      <h1>Create Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
};

export default journalEntry;