import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  title: {
    type: String,
  },
  
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
