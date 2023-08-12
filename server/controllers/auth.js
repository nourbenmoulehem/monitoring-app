import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//handle errors
const handleErr = (err) => {
  console.log("youre in the handleerr");
  console.log("🚀 ~ file: auth.js:10 ~ handleErr ~ err.code:", err.code);
  console.log("🚀 ~ file: auth.js:10 ~ handleErr ~ err.message:", err.message);

  let errors = {};

  //duplicate email error code
  if (err.code === 11000) {
    errors.email = "The email already exists";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    console.log(Object.values(err.errors));
    console.log(
      "🚀 ~ file: auth.js:17 ~ handleErr ~ Object.values(err.errors):",
      Object.values(err.errors)
    );
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
      console.log("errors");
      console.log(errors);
    });
  }

  return errors;
};

const maxAge = "6h"; // lifetime of a jwt token

//creating token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// refresh token
export const refreshToken = (req, res, next) => {
  console.log(
    " in***********************************************************************************"
  );
  console.log(req.cookies);
  const cookies =req.headers.cookie; //req.headers.cookie

  console.log("🚀 ~ file: auth.js:53 ~ refreshToken ~ cookies:", cookies)

  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    console.log(user);
    console.log("avant: user_id:", user._id);
    console.log(
      "avant: 🚀 ~ file: auth.js:65 ~ jwt.verify ~ req.cookies:",
      req.cookies
    );
    res.clearCookie(`${user._id}`);

    req.cookies[`${user._id}`] = ""

    console.log(
      "apres: 🚀 ~ file: auth.js:65 ~ jwt.verify ~ req.cookies:",
      req.cookies
    );

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });


    req._id = user._id;
    console.log("🚀 ~ file: auth.js:89 ~ jwt.verify ~ req._id:", req._id);
    console.log("🚀 ~ file: auth.js:89 ~ jwt.verify ~ user._id:", user._id);
    

    next();
  });
};

/* REGISTER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      occupation,
      agency,
      email,
      password,
      role,
    } = req.body;

    console.log("i think we're in the rgister at least?");
    console.log(req.body);

    // the hashing are all held in the model
    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fName: firstName,
      lName: lastName,
      location,
      occupation,
      agency,
      email,
      password,
      role,
    });
    console.log("🚀 ~ file: auth.js:74 ~ register ~ newUser:", newUser);

    // create a token
    // const token = createToken(newUser._id);

    const savedUser = await newUser.save();
    res.status(201).json({ email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calculate the expiration date
const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 3); // Expires in 3 day

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdb = await User.findOne({ email: email });

    if (!userdb) return res.status(400).json({ msg: "User does not exist. " });

    const match = await bcrypt.compare(password, userdb.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const user = userdb.toObject();
    delete user.password;

    const token = createToken(user._id);

    console.log("Generated token from login\n", token);

    // Clear existing cookie (if any)
    res.clearCookie(String(user._id));

    // Set the new cookie with a 6-hour expiration
    const sixHours = 6 * 60 * 60 * 1000;
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + sixHours),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//for testing purposes
export const getUser = async (req, res, next) => {
  const userId = req._id;
  console.log("🚀 ~ file: auth.js:176 ~ getUser ~ userId:", userId);

  const cookies = req.headers.cookie;
  console.log("🚀 ~ file: auth.js:5 ~ verifyToken ~ cookies:", cookies);
  const token = cookies.split("=")[1];
  console.log("🚀 ~ file: auth.js:198 ~ getUser ~ token:", token);

  let user;


  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found hehiha" });
  }

  return res.status(200).json({ user, token });
};


/* Creating New user by the admin */
export const createNewUser = async (req, res) => {
  const { fName, lName, email, city, occupation, phoneNumber, role, password } =
    req.body;
  try {
    console.log("hii?");
    const user = await User.create({
      fName,
      lName,
      email,
      city,
      occupation,
      phoneNumber,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
    console.log("🚀 ~ file: auth.js:78 ~ createNewUser ~ err:", err);
  }
};

export const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user._id}`);
    req.cookies[`${user._id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};
