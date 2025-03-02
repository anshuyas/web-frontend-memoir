import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/public/home";
import Login from "./components/public/login";
import Register from "./components/public/register";
import Dashboard from "./components/private/dashboard";
import JournalEntry from "./components/private/journalEntry";
import Calendar from "./components/private/calendar";
import ForgotPassword from "./components/public/forgotPassword";
import ProtectedRoute from "./components/private/protectedRoute";
import About from "./components/public/about";
import TermsAndConditions from "./components/public/terms";
import SearchPage from "./components/private/searchPage";
import Settings from "./components/private/settings";
import AdminDashboard from "./components/private/adminDashboard";
import ViewAnalytics from "./components/private/ViewAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>

        {/* Protected route  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/journal-entry" element={<JournalEntry/>}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/view-analytics" element={<ViewAnalytics/>}/>
        </Route>
          
        <Route path="/journals/:id/edit" element={<JournalEntry/>}/>

        <Route path="/search"
         element={<SearchPage />}
          />

       <Route path="/journal-entry/:id"
        element={<JournalEntry />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
    
      </Routes>
    </Router>
  );
}

export default App;