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
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
