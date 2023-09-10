import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";

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
  const cookies = req.headers.cookie; //req.headers.cookie

  console.log("🚀 ~ file: auth.js:53 ~ refreshToken ~ cookies:", cookies);

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

    req.cookies[`${user._id}`] = "";

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

    // verify if email domain
    const allowedDomains = ["@gmail.com", "@example.com"];

    const domain = email.substring(email.lastIndexOf("@"));
    console.log("🚀 ~ file: auth.js:119 ~ register ~ domain:", domain)

    if (!allowedDomains.includes(domain)) {
      return res.status(400).json({ message: "Invalid email domain. Please use your corporate email address." });
    }

    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let activationCode = "";
    for (let i = 0; i < 8; i ++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        activationCode += allowedChars.charAt(randomIndex);
    }



    const newUser = new User({
      fName: firstName,
      lName: lastName,
      location,
      occupation,
      agency,
      email,
      password,
      role,
      activationCode
    });
    console.log("🚀 ~ file: auth.js:74 ~ register ~ newUser:", newUser);

    // create a token
    // const token = createToken(newUser._id);
    const savedUser = await newUser.save();
    sendConfirmationEmail(
      savedUser.fName,
      savedUser.email,
      savedUser.activationCode,
    );
    res.status(201).json({ email });
  } catch (err) {
    const errors = handleErr(err);
    console.log("🚀 ~ file: auth.js:160 ~ register ~ errors:", errors)
    res.status(400).json({ errors });
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

    if (!userdb) return res.status(400).json({ msg: "Email does not exist. " });

    if(!userdb.isActive) {
      return res.status(400).json({ msg: "Please check your email" });
    }

    const match = await bcrypt.compare(password, userdb.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials. Please verify your password" });
    }

    // if (password !== userdb.password) {
    //   return res.status(400).json({ msg: "Invalid credentials. Please verify your password" });
    // }

    const user = userdb.toObject();
    
    console.log("paasword after isActive", user.password)
    console.log("🚀 ~ file: auth.js:185 ~ login ~ user:", user)
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


// reset password 

export const forgetPassword = async (req, res) => {
  const email = req.body.email;

  console.log("🚀 ~ file: auth.js:289 ~ forgetPassword ~ req.body.email:", req.body.email)
  console.log("🚀 ~ file: auth.js:289 ~ forgetPassword ~  req.body:",  req.body)
  console.log("🚀 ~ file: auth.js:289 ~ forgetPassword ~ email:", email)
  try {
    const userdb = await User.findOne({ email });
    if (!userdb) {
      return res.status(400).json({ msg: "No user found with this email, please check again." });
    }

    const secret = userdb.password + process.env.JWT_SECRET;
    const token = jwt.sign({email: userdb.email, id: userdb._id}, secret, {expiresIn: '5m'});

    // const link = `http://localhost:5001/auth/reset-password/${user._id}/${token}`
    

    transport
    .sendMail({
      from: user,
      to: email,
      subject: "Reset Your Password",
      html: `
      <html>
      <head>
        <style>
          /* Add your custom styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #555555;
          }
          h2 {
            color: #0000FF;
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You have requested to reset your password</h1>
           <h2> hello,</h2>
          
          <p>Please click on this link so It will lead you to reset your password :</p>
          <a href=http://localhost:3000/reset-password/${userdb._id}/${token}>Cliquez ici: http://localhost:3000/reset-password/${userdb._id}/${token}
        </a>
          <p>Cordialement,<br>L'équipe du site</p>
        </div>
      </body>
    </html>
      `,
    })
    .catch((err) => console.log(err));
    return res.status(200).json({ msg: "email with a link to reset your password has been sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "No user found with this email, please check again.", error });
    
  }
}
// function to update new password after the verification of token
export const resetPassword = async (req, res) => {
  console.log("hello in the reset password");
  const {id, token} = req.params;

  const {password} = req.body;
  console.log("🚀 ~ file: auth.js:313 ~ resetPassword ~ newPassword:", password)
  
  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(400).json({ msg: "No user found with this id." });
  }

  const secret = user.password + process.env.JWT_SECRET;

  try {
    const verify = jwt.verify(token, secret) // top check if they match

    //hashing new password
    const salt = await bcrypt.genSalt(); //13
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return res.status(200).json({ msg: "Your Password has been updated successfully!" });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:344 ~ resetPassword ~ error:", error);

    return res.status(400).json({ msg: "something went wrong with bcrypt ot while saving the new password" });
    
  }
}
// nodeMailer configuration

// email used to send emails to users
const user = "nouramira941@gmail.com"; 
const pass = "chxrmtmyaqlwckyg"; 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


// confirmation link to user, func has 4 parameters
export const sendConfirmationEmail = (
  name,
  email,
  activationCode,
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Veuillez activer votre compte ",
      html: `
      <html>
      <head>
        <style>
          /* Add your custom styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #555555;
          }
          h2 {
            color: #0000FF;
          }
          .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bienvenue sur notre site</h1>
          <p>Cher</p> <h2> ${ name },</h2>
          <p>Nous sommes ravis de vous accueillir parmi nous !</p>
          <p>Veuillez cliquer sur le bouton ci-dessous pour activer votre compte :</p>
          <a href=http://localhost:3000/confirm/${activationCode}>Cliquez ici: http://localhost:3000/confirm/${activationCode}
        </a>
          <p>Cordialement,<br>L'équipe du site</p>
        </div>
      </body>
    </html>
      `,
    })
    .catch((err) => console.log(err));
}

// verify user when he clicks on confirmation link sent by email
export const verifyUser = (req, res) => {
  const activationCode = req.params.activationCode;
  console.log("🚀 ~ file: auth.js:312 ~ verifyUser ~ activationCode:", activationCode);

  // Use updateOne to directly update the user's isActive field
  User.updateOne({ activationCode: activationCode }, { $set: { isActive: true } })
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.send({ message: "Account has been activated" });
    })
    .catch((error) => {
      // Handle any error that occurs during the update
      res.status(400).send({ message: "Error while updating user data" });
    });
};
