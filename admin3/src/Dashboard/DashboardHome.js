import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

const DashboardHome = () => {
  const [today] = useState(moment().format("dddd"));
  const [date] = useState(moment().format("DD MMM YYYY"));
  const [events, setEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState(0);
  const [pendingEvents, setPendingEvents] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallcalendar");
        const todayEvents = response.data.filter((event) =>
          moment(event.start).isSame(moment(), "day")
        );

        // Categorize events as "completed" or "pending"
        const completed = todayEvents.filter((e) => moment(e.end).isBefore(moment())).length;
        const pending = todayEvents.filter((e) => moment(e.end).isAfter(moment())).length;

        setEvents(todayEvents);
        setCompletedEvents(completed);
        setPendingEvents(pending);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // ✅ Removed `events` dependency to prevent infinite loops

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>
        <div className="col-lg-3 col-md-3 col-sm-12 calendar-card">
          <h2>{today}</h2>
          <p>{date}</p>
          <div className="events-count">{events.length} events</div>

          <hr className="calendar-line" />

          <div className="events-info">
            <div>
              <span>✅ Completed Events:</span>
              <span className="completed">{completedEvents}</span>
            </div>
            <div>
              <span>⏳ Pending Events:</span>
              <span className="pending">{pendingEvents}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
