import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";



//handle errors
const handleErr = (err) =>{
  console.log("youre in the handleerr")
  console.log("🚀 ~ file: auth.js:10 ~ handleErr ~ err.code:", err.code)
  console.log("🚀 ~ file: auth.js:10 ~ handleErr ~ err.message:", err.message)

  let errors = {};

  //duplicate email error code
  if(err.code === 11000){
    errors.email = 'The email already exists';
    return errors;
  }
  
   // validation errors
   if (err.message.includes('User validation failed')) {
    console.log(Object.values(err.errors));
    console.log("🚀 ~ file: auth.js:17 ~ handleErr ~ Object.values(err.errors):", Object.values(err.errors))
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
      console.log("errors")
      console.log(errors)
    });
   
  }

  return errors;
}

const maxAge = "35s"; // lifetime of a jwt token

//creating token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};



// refresh token
export const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  console.log("🚀 ~ file: auth.js:54 ~ refreshToken ~ prevToken:", prevToken)
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user._id}`);
 
    req.cookies[`${user._id}`] = "";

    console.log("🚀 ~ file: auth.js:70 ~ jwt.verify ~ req:", req)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user._id;
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
    } = req.body;

    console.log("i think we're in the rgister at least?")
    console.log(req.body)

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
    });
    console.log("🚀 ~ file: auth.js:74 ~ register ~ newUser:", newUser)

    // create a token
    const token = createToken(newUser._id)

    const savedUser = await newUser.save();
    res.status(201).json({email, token});
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
    console.log("🚀 ~ file: auth.js:97 ~ login ~ user:", userdb)
    
    if (!userdb) return res.status(400).json({ msg: "User does not exist. " });

    const match = await bcrypt.compare(password, userdb.password);
    if(!match){
      res.status(400).json({ msg: "Invalid credentials. just to make sure" });
    }

    const user = userdb.toObject(); // Convert Mongoose document to plain object
    delete user.password; // Delete the password property from the object
    // console.log("🚀 ~ file: auth.js:128 ~ login ~ userObj:", user)

    // create token
    const token = createToken(user._id)



    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
  
    res.status(201).json({user, token});

    

    
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
    
};

//for testing purposes
export const getUser = async (req, res, next) => {
  const userId = req.user._id;
  // console.log("🚀 ~ file: auth.js:176 ~ getUser ~ userId:", userId)
  
  
  let user;

  // console.log(req.cookies)
  // console.log("🚀 ~ file: auth.js:181 ~ getUser ~ req.cookies:", req.cookies)

  try {
    user = await User.findById(userId, "-password")
  } catch (error) {
    return new Error(err)
  }

  if(!user) {
    return res.status(404).json({message: "User not found"})
  }

  return res.status(200).json({user});
}

/* Creating New user by the admin */
export const createNewUser = async (req, res) => {
  const { fName, lName, email, city, occupation, phoneNumber, role, password } = req.body;
  try {
      console.log("hii?")
      const user = await User.create({ fName, lName, email, city, occupation, phoneNumber, role });

      res.status(201).json(user);
      


    
    } catch (err) {
      // console.log("opsi")
      // console.log(err);
      // console.log("🚀 ~ file: auth.js:63 ~ createNewUser ~ err:", err)
      // const errors = handleErr(err)
      // res.status(400).json({ errors });
      res.status(400).json(err);
      console.log("🚀 ~ file: auth.js:78 ~ createNewUser ~ err:", err)
  } 
  };

