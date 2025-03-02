import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // Your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

//Handle token expiration (optional)
API.interceptors.response.use(
  (response) => response, // If response is successful, return it
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token"); // Remove invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Reject the error
  });

export default API;
