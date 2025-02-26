import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/admindashboard.css"; // Create this file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchJournalEntries();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      console.log("Users API Response:", response.data);

      const userData = Array.isArray(response.data) ? response.data : response.data.users;
      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        throw new Error("Invalid user data format");
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get("/api/admin/journal-entries");
      console.log("Journal Entries API Response:", response.data);

      const journalData = Array.isArray(response.data) ? response.data : response.data.journalEntries;
      if (Array.isArray(journalData)) {
        setJournalEntries(journalData);
      } else {
        throw new Error("Invalid journal entry format");
      }
    } catch (err) {
      setError("Failed to fetch journal entries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const deleteJournalEntry = async (entryId) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      try {
        await axios.delete(`/api/admin/journal-entries/${entryId}`);
        setJournalEntries(journalEntries.filter((entry) => entry.id !== entryId));
        alert("Journal entry deleted successfully!");
      } catch (err) {
        setError("Failed to delete journal entry");
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? <p>Loading...</p> : null}

      {/* User Table */}
      <h2>Users</h2>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/user/${user.id}`} className="view-link">
                    View
                  </Link>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {/* Journal Entries Table */}
      <h2>Journal Entries</h2>
      {journalEntries.length > 0 ? (
        <table className="journal-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {journalEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.userId}</td>
                <td>{entry.content}</td>
                <td>
                  <button onClick={() => deleteJournalEntry(entry.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No journal entries found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;