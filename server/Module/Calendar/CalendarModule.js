import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["News", "Event", "Birthday", "Thought"],
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  color: {
    type: String,
    default: "#007bff",
  },
});

export const CalendarData = mongoose.model("calendar", calendarSchema);
