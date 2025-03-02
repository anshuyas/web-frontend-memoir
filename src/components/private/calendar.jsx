import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Input, Select, message } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import "../../styles/calendar.css";

const { Option } = Select;

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mood, setMood] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Fetch journal entries from backend
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/journal", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          const formattedEvents = response.data.entries.map((entry) => ({
            id: entry.id,
            title: entry.mood || "Journal Entry",
            date: entry.createdAt.split("T")[0],
            extendedProps: { journal: entry.content },
          }));

          setEvents(formattedEvents);
        } else {
          message.error("Failed to load journal entries.");
        }
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        message.error("Failed to load journal entries.");
      }
    };

    fetchJournalEntries();
  }, []);

  // Handle date click
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const entry = events.find((event) => event.date === clickedDate);

    setSelectedDate(clickedDate);
    setSelectedEntry(entry);
    setMood(entry ? entry.title : "");
    setIsModalVisible(true);
  };

  // Handle mood selection
  const handleMoodChange = (value) => {
    setMood(value);
  };

  // Save mood to backend
  const saveMood = async () => {
    if (!selectedEntry) {
      message.warning("No journal entry found for this date.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/journal/${selectedEntry.id}`,
        { mood },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEntry.id ? { ...event, title: mood } : event
        )
      );

      setIsModalVisible(false);
      message.success("Mood updated successfully!");
    } catch (error) {
      console.error("Error updating mood:", error);
      message.error("Failed to update mood.");
    }
  };

  // Handle search by date
  const handleSearch = () => {
    const entry = events.find((event) => event.date === searchDate);

    if (entry) {
      setSelectedDate(entry.date);
      setSelectedEntry(entry);
      setMood(entry.title);
      setIsModalVisible(true);
    } else {
      message.info("No journal entry found for this date.");
    }
  };

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <Input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Search by date"
          style={{ width: "200px", marginRight: "10px" }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <div>
            <strong>{eventInfo.event.title}</strong>
          </div>
        )}
      />

      {/* Modal for Journal Entry and Mood */}
      <Modal
        title={`Journal Entry for ${selectedDate}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedEntry ? (
          <div>
            <p>{selectedEntry.extendedProps.journal}</p>
            <Select
              placeholder="Select your mood"
              style={{ width: "100%", marginBottom: "10px" }}
              value={mood}
              onChange={handleMoodChange}
            >
              <Option value="😊 Happy">😊 Happy</Option>
              <Option value="😢 Sad">😢 Sad</Option>
              <Option value="😡 Angry">😡 Angry</Option>
              <Option value="😴 Tired">😴 Tired</Option>
              <Option value="😎 Cool">😎 Cool</Option>
            </Select>
            <Button type="primary" onClick={saveMood}>
              Save Mood
            </Button>
          </div>
        ) : (
          <p>No journal entry for this date.</p>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
