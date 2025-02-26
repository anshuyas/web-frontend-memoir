import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Input, Select } from "antd";
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

  // Mock data for journal entries
  const mockJournalEntries = [
    {
      id: 1,
      date: "2024-12-25",
      title: "😊 Happy",
      content: "Had a great day with friends!",
    },
    {
      id: 2,
      date: "2025-01-20",
      title: "😢 Sad",
      content: "Feeling a bit down today.",
    },
    {
      id: 3,
      date: "2025-02-22",
      title: "😴 Tired",
      content: "Worked late and feeling exhausted.",
    },
  ];

  // Simulate fetching journal entries
  useEffect(() => {
    // console.log("Fetching mock data...");
    const formattedEvents = mockJournalEntries.map((entry) => ({
      title: entry.title,
      date: entry.date,
      journal: entry.content,
    }));
    // console.log("Formatted events:", formattedEvents);
    setEvents(formattedEvents);
  }, []);

  // Handle date click
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    const entry = events.find((event) => event.date === clickedDate);

    setSelectedDate(clickedDate);
    setSelectedEntry(entry);
    setIsModalVisible(true);
  };

  // Handle mood selection
  const handleMoodChange = (value) => {
    setMood(value);
  };

  // Simulate saving mood
  const saveMood = () => {
    const updatedEvents = events.map((event) =>
      event.date === selectedDate ? { ...event, title: mood } : event
    );
    setEvents(updatedEvents);

    setIsModalVisible(false);
    alert("Mood saved successfully!");
  };

  // Handle search by date
  const handleSearch = () => {
    const entry = mockJournalEntries.find((entry) => entry.date === searchDate);

    if (entry) {
      setSelectedDate(entry.date);
      setSelectedEntry(entry);
      setIsModalVisible(true);
    } else {
      alert("No journal entry found for this date.");
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
          style={{ width: "200px" }}
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
             <p>{selectedEntry.journal}</p>
            <Select
              placeholder="Select your mood"
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={handleMoodChange}
            >
              <Option value="😊 Happy">😊 Happy</Option>
              <Option value="😢 Sad">😢 Sad</Option>
              <Option value="😡 Angry">😡 Angry</Option>
              <Option value="😴 Tired">😴 Tired</Option>
              <Option value="😎 Cool">😎 Cool</Option>
            </Select>
            <Button type="primary" onClick={saveMood}>
                Save Mood</Button>
          </div>
        ) : (
          <p>No journal entry for this date.</p>
        )}
      </Modal>
    </div>
  );
};

export default Calendar; 