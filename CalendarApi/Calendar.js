import { CalendarData } from "../Module/Calendar/CalendarModule.js"

export const CreateCalendar = async(req, res) => {
    try{
        const event = new CalendarData(req.body);
        if (!event){
            return res.status(404).json({msg: "Data Not Found"})
        }
        await event.save();
        res.status(200).json({msg: "Data Added Successfully", data: event})
    } catch(error) {
        res.status(500).json({ msg: "Server error" });
    }
}

// export const CreateExcelEvent = async (req, res) => {
//   try {
//     if (!Array.isArray(req.body) || req.body.length === 0) {
//       return res.status(400).json({ error: "Invalid data received" });
//     }

//     const validEvents = req.body.map(event => ({
//       title: event.title || "Untitled Event",
//       start: new Date(event.start),
//       end: new Date(event.end),
//     }));


//     await CalendarData.insertMany(validEvents);
//     res.json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Database Error:", error);
//     res.status(500).json({ error: "Failed to save data" });
//   }
// };


export const CreateExcelEvent = async (req, res) => {
  try {
    const validEvents = req.body.events;
    await CalendarData.insertMany(validEvents);
    res.json({ message: "Calendar events imported" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
};


export const GetAllCalendar = async(req, res) => {
      try{
        const existdata = await CalendarData.find();
    
        if(!existdata) {
          return res.status(404).json({msg: "Data Not Found"});
        }
        res.status(200).json(existdata);
    } catch(error) {
        res.status(500).json({msg: "server error"})
    }
}

export const UpdateCalendar = async(req, res) => {
    const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedEvent = await CalendarData.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
}