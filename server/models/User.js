import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "First name is required"],
      min: 2,
      max: 100,
    },
    lName: {
      type: String,
      required: [true, "Last name is required"],
      min: 2,
      max: 100,
    },

    email: {
      type: String,
      required: [true, "Please entre an email"],
      max: 50,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    location: String,
    picturePath: {
      type: String,
      default: "",
    },
    city: String,
    occupation: String,
    phoneNumber: String,
    
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema); //mongo is going to plurilize it
export default User;
