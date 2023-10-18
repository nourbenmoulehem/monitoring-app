import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  text: String
}, {timestamps: true});


const Message = mongoose.model("Message", messageSchema);

export default Message;