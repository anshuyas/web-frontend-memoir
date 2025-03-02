import React, { useEffect, useState } from "react";
import axios from "axios";
import MoodChart from "./MoodChart";
import Milestones from "./Milestones";
import "../../styles/analytics.css";
import background from "../../assets/background.png";

axios.defaults.baseURL = "http://localhost:4000";

const ViewAnalytics = () => {
  const [moodData, setMoodData] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [moodResponse, milestoneResponse] = await Promise.all([
          axios.get("/api/journals/mood-trends", { headers }),
          axios.get("/api/journals/milestones", { headers }),
        ]);

        setMoodData(moodResponse.data.moodTrends || []);
        setMilestones(milestoneResponse.data.milestones || []);
      } catch (err) {
        console.error("Error fetching analytics:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(`Failed to load analytics. ${err.response?.data?.error || err.message}`);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-container" style={{ backgroundImage: `url(${background})` }}>
      <h1>Journal Analytics</h1>
      {error && <p className="error">{error}</p>}
      {moodData.length > 0 ? <MoodChart data={moodData} /> : <p>No mood data available.</p>}
      {milestones.length > 0 ? <Milestones milestones={milestones} /> : <p>No milestones yet.</p>}
    </div>
  );
};

export default ViewAnalytics;