import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema(
  {
    

    email: {
      type: String,
      required: [true, "Please entre an email"],
      max: 50,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    
    password: {
      type: String,
      minlength: [5, "Minimum password length is 5 characters"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
AccountSchema.post("save", function (doc, next) {
  console.log("new user account was created & saved", doc);
  next();
});

// fire a function before doc saved to db
AccountSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(); //13
    this.password = await bcrypt.hash(this.password, salt);
    
  }
  next();
});

const Account = mongoose.model("Account", AccountSchema); //mongo is going to plurilize it
export default Account;
