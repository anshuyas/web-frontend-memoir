import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/public/home";
import Login from "./components/public/login";
import Register from "./components/public/register";
import Dashboard from "./components/private/dashboard";
import JournalEntry from "./components/public/journalEntry";
import Calendar from "./components/public/calendar";
import ForgotPassword from "./components/public/forgotPassword";
import ProtectedRoute from "./routes/protectedRoute";
import About from "./components/public/about";
import TermsAndConditions from "./components/public/terms";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>
        <Route
          path="/dashboard"
          element={
            
              <Dashboard />
            
          }
        />
        <Route
          path="/journal-entry"
          element={
            <ProtectedRoute>
              <JournalEntry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;