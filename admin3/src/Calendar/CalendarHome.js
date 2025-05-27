import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as XLSX from "xlsx";


const localizer = momentLocalizer(moment);

export const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("All"); // Default: Show all events
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    title: "Birthday", 
    description: "", 
    start: "", 
    end: "", 
    color: "#ff0000" // Default color (red)
  });
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [view, setView] = useState("month");
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  // Fetch events from backend
  useEffect(() => {
    axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallcalendar")
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Update filtered events when events, view, or date changes
  useEffect(() => {
    filterEvents(view, currentDate);
  }, [events, view, currentDate]);

  // Filter events based on the selected view
  const filterEvents = (selectedView, selectedDate) => {
    let filtered = events.filter(event => event.title === "Birthday"); 

    if (selectedView === "month") {
      setFilteredEvents(events);
    } else if (selectedView === "week") {
      const startOfWeek = moment(selectedDate).startOf("week");
      const endOfWeek = moment(selectedDate).endOf("week");
      setFilteredEvents(events.filter((event) =>
        moment(event.start).isBetween(startOfWeek, endOfWeek, null, "[]")
      ));
    } else if (selectedView === "day") {
      const today = moment(selectedDate).startOf("day");
      setFilteredEvents(events.filter((event) => moment(event.start).isSame(today, "day")));
    }
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Handle navigation
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  // Open popup when clicking a date
  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      title: "Birthday", // Default title as dropdown
      description: "",
      start: moment(slotInfo.start).format("DD-MM-YYYY HH:mm"),
      end: moment(slotInfo.end).format("DD-MM-YYYY HH:mm"),
      color: "#ff0000", // Default color (red)
    });
    setShowPopup(true);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Submit new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description) {
      return alert("Please enter event title and description.");
    }
  
    try {
      const response = await axios.post("http://gosaviadvanceddentalclinic.com:8003/api/createcalendar", {
        title: newEvent.title,
        description: newEvent.description,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        color: newEvent.color, // Include the selected color
      });
  
      const addedEvent = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };
  
      // Update both `events` and `filteredEvents` state immediately
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
      setFilteredEvents((prevEvents) => [...prevEvents, addedEvent]); // Ensure filtered view updates too
  
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  

  // Handle event hover
  const handleEventHover = (event, e) => {
    setHoveredEvent(event);
    setPopupPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  // Hide hover popup when leaving an event
  const handleEventLeave = () => {
    setHoveredEvent(null);
  };



    // Handle Excel export
    const handleExport = () => {
      const ws = XLSX.utils.json_to_sheet(events.map(event => ({
        Title: event.title,
        Description: event.description,
        Start: moment(event.start).format("DD-MM-YYYY HH:mm"),
        End: moment(event.end).format("DD-MM-YYYY HH:mm"),
        Color: event.color
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Events");
      XLSX.writeFile(wb, "calendar_events.xlsx");
    };
  
    const handleImportClick = () => {
      setShowUploadPopup(true);
    };
  
    const closeUploadPopup = () => {
      setShowUploadPopup(false);
    };


    // Handle Excel import
    const handleImport = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
    
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
    
          console.log("Workbook:", workbook);
    
          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            console.error("No sheets found in the Excel file.");
            return;
          }
    
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
    
          console.log("Sheet:", sheet);
    
          if (!sheet) {
            console.error("Sheet is undefined");
            return;
          }
    
          // Convert sheet to JSON
          const parsedData = XLSX.utils.sheet_to_json(sheet);
    
          console.log("Parsed Data:", parsedData);
    
          if (!parsedData || parsedData.length === 0) {
            console.error("Parsed data is empty. Ensure the file is correctly formatted.");
            return;
          }
    
          // Ensure correct date format
          const importedEvents = parsedData.map(row => {
            let startDate = isNaN(row.Start) ? 
            moment(row.Start, ["DD-MM-YYYY HH:mm", "YYYY-MM-DD HH:mm"]).toDate() : 
            convertExcelDate(row.Start);
          
          let endDate = isNaN(row.End) ? 
            moment(row.End, ["DD-MM-YYYY HH:mm", "YYYY-MM-DD HH:mm"]).toDate() : 
            convertExcelDate(row.End);
          
    
            return {
              title: row.Title || "Untitled Event",
              description: row.Description || "No description",
              start: startDate,
              end: endDate,
              color: row.Color || "#007bff",
            };
          });
    
          console.log("Imported Events (Before Sending to API):", importedEvents);
    
          // Send events to the backend
          const response = await fetch("http://gosaviadvanceddentalclinic.com:8003/api/createexcelevents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(importedEvents),
          });
    
          if (!response.ok) {
            throw new Error("Failed to save events");
          }
    
          console.log("Events imported successfully!");
    
          // Fetch updated events from the backend
          const updatedEvents = await fetch("http://gosaviadvanceddentalclinic.com:8003/api/getallcalendar").then(res => res.json());
          setEvents(updatedEvents);
          setFilteredEvents(updatedEvents);
          setShowUploadPopup(false);
        } catch (error) {
          console.error("Error importing events:", error);
        }
      };
    
      reader.readAsArrayBuffer(file);
    };
    

    const convertExcelDate = (excelDate) => {
      return new Date((excelDate - 25569) * 86400 * 1000); // Convert from Excel serial date
    };
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>
        <div className="col-lg-10 col-md-10 col-sm-12 calendar">
        <button onClick={handleExport} className="export-btn">Export to Excel</button>
        <button onClick={handleImportClick} className="import-btn">Import Excel</button>
      {showUploadPopup && (
        <div className="excel-popup-overlay">
          <div className="excel-popup-box">
            <h3 style={{color:"rgb(6, 74, 118)"}}>Upload Excel File</h3>
            <input id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleImport} /><br/>
            <button onClick={closeUploadPopup} className="excel-close-btn">Close</button>
          </div>
        </div>
      )}
      
       <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={handleViewChange}
            date={currentDate}
            onNavigate={handleNavigate}
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ background: "white", borderRadius: "10px" }}
            components={{
              event: ({ event }) => (
                <div
                  onMouseEnter={(e) => handleEventHover(event, e)}
                  onMouseLeave={handleEventLeave}
                  style={{ 
                    cursor: "pointer", 
                    color: "white", 
                    backgroundColor: event.color || "#007bff", // Default to blue if no color
                    padding: "5px",
                    borderRadius: "5px",
                    border: "none" 
                  }}
                >
                  {event.title}
                </div>
              ),
            }}
          />

          {/* Popup for adding event */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content-calendar">
                <h3>Add New Event</h3>
                <form onSubmit={handleSubmit}>
                  <label>Event Type:</label>
                  <select
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="News">News</option>
                    <option value="Thought">Thought</option>
                    <option value="Event">Event</option>
                  </select>

                  <textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    required
                  />

                  <label>Event Color:</label>
                  <input
                    type="color"
                    value={newEvent.color}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, color: e.target.value })
                    }
                  />

                  <label>Start Date & Time:</label>
                  <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, start: e.target.value })
                    }
                    required
                  />
                  <label>End Date & Time:</label>
                  <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: e.target.value })
                    }
                    required
                  />
                  <button type="submit" className="add-btn">
                    Add Event
                  </button>
                  <button type="button" className="cancel-btn" onClick={closePopup}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Popup for hovering over an event */}
          {hoveredEvent && (
            <div
              className="event-popup"
              style={{
                position: "absolute",
                top: popupPosition.y,
                left: popupPosition.x,
                background: "#000",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
            >
              <strong>{hoveredEvent.title}</strong>
              <br />
              {hoveredEvent.description}
              <br />
              {moment(hoveredEvent.start).format("MMMM D, YYYY h:mm A")} -{" "}
              {moment(hoveredEvent.end).format("h:mm A")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
