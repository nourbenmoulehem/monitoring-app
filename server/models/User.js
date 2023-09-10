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
    password: {
      type: String,
      unique: true,
      minlength: [5, "Minimum password length is 5 characters"],
    },
    picturePath: {
      type: String,
      default: "",
    },
    city: String,
    occupation: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    activationCode: String,
  },
  { timestamps: true }
);

//HOOKS
// fire a function after doc saved to db
UserSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(); //13
    this.password = await bcrypt.hash(this.password, salt);
    
  }

  next();
});

const User = mongoose.model("User", UserSchema); //mongo is going to plurilize it
export default User;
