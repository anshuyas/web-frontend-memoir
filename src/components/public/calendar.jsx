import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/journal", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedEvents = response.data.map((entry) => ({
          title: entry.title,
          date: entry.date,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        alert("Failed to fetch entries.");
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default calendar;