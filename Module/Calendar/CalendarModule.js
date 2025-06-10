import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["News", "Event", "Student Birthday", "Staff Birthday", "Thought"],
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
    default: "#bd2d5d",
  },
});

export const CalendarData = mongoose.model("calendar", calendarSchema);
