import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const event = Event(req.body);
  await event.save();

  res.status(200).json({ msg: "event has been saved successfully" });
}

export const getEvents = async (req, res) => {
  try {
    // Use the find method to retrieve all events
    const events = await Event.find();

    // Send the retrieved events as a JSON response
    res.json(events);
  } catch (error) {
    // Handle any errors
    console.error("Error retrieving events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};