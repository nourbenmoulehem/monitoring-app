import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Account from "../models/Account.js";
import nodemailer from "nodemailer";

//handle errors
const handleErr = (err) => {
  let errors = {};

  //duplicate email error code
  if (err.code === 11000) {
    errors.email = "The email already exists";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;

      console.log(errors);
    });
  }

  return errors;
};

const maxAge = "6h"; // lifetime of a jwt token

//creating token
const createToken = (_id, email, fName) => {
  return jwt.sign({ _id, email, fName }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// refresh token
export const refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie; //req.headers.cookie

  const prevToken = cookies.split("=")[1];
  const userID = cookies.split("=")[0];
  console.log("🚀 ~ file: auth.js:51 ~ refreshToken ~ userID:", userID);

  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  const userAuthenticated = await User.findOne({ _id: userID });

  jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user._id}`);

    console.log("🚀 ~ file: auth.js:66 ~ jwt.verify ~ user._id:", user._id);
    req.cookies[`${user._id}`] = "";

    const token = jwt.sign(
      {
        _id: user._id,
        email: userAuthenticated.email,
        fName: userAuthenticated.fName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req._id = user._id;

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
    console.log("🚀 ~ file: auth.js:96 ~ register ~ req.body:", req.body);

    // verify if email domain
    const allowedDomains = ["@gmail.com", "@example.com", "@istic.ucar.tn"];

    const domain = email.substring(email.lastIndexOf("@"));
    console.log("🚀 ~ file: auth.js:100 ~ register ~ domain:", domain);

    if (!allowedDomains.includes(domain)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid email domain. Please use your corporate email address.",
        });
    }

    const allowedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let activationCode = "";
    for (let i = 0; i < 8; i++) {
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
    });

    const savedUser = await newUser.save();

    const newAccount = new Account({
      email,
      password, // You may want to hash the password here
      activationCode,
      role,
      user: savedUser._id, // Set the reference to the newly created User
    });

    const savedAccount = await newAccount.save();

    sendConfirmationEmail(
      savedUser.fName,
      savedAccount.email,
      savedAccount.activationCode
    );
    res.status(201).json({ email });
  } catch (err) {
    console.log("🚀 ~ file: auth.js:147 ~ register ~ err:", err);
    const errors = handleErr(err);

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
    console.log("🚀 ~ file: auth.js:161 ~ login ~ req.body:", req.body);
    const accountdb = await Account.findOne({ email: email });

    if (!accountdb)
      return res.status(400).json({ msg: "Email does not exist. " });

    if (!accountdb.isActive) {
      return res.status(400).json({ msg: "Please check your email" });
    }

    const match = await bcrypt.compare(password, accountdb.password);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials. Please verify your password" });
    }

    // if (password !== userdb.password) {
    //   return res.status(400).json({ msg: "Invalid credentials. Please verify your password" });
    // }

    const account = accountdb.toObject();

    const user = await User.findOne({ _id: account.user });
    console.log("🚀 ~ file: auth.js:182 ~ login ~ user:", user);

    console.log("paasword after isActive", account.password);
    console.log("🚀 ~ file: auth.js:185 ~ login ~ user:", account);
    delete account.password;

    const token = createToken(user._id, user.email, user.fName);

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
    console.log("🚀 ~ file: auth.js:203 ~ login ~ err:", err);
    res.status(500).json({ error: err.message });
  }
};

//for testing purposes
export const getUser = async (req, res, next) => {
  const userId = req._id;

  const cookies = req.headers.cookie;

  const token = cookies.split("=")[1];
  console.log("🚀 ~ file: auth.js:221 ~ getUser ~ token:", token);

  let user;

  try {
    user = await User.findById(userId);
    console.log("🚀 ~ file: auth.js:227 ~ getUser ~ user:", user);
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
  const {
    fName,
    lName,
    email,
    city,
    agency,
    location,
    occupation,
    phoneNumber,
    role,
  } = req.body;
  try {
    console.log("hii?");
    const userdb = await User.create({
      fName,
      lName,
      email,
      city,
      agency,
      location,
      occupation,
      phoneNumber,
      role,
    });

    const allowedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let activationCode = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      activationCode += allowedChars.charAt(randomIndex);
    }

    const isActive = true;
    const account = await Account.create({
      email,
      activationCode,
      isActive,
      user: userdb._id,
    });
    const token = jwt.sign(
      { email: account.email, id: account._id },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
    transport.sendMail({
      from: user,
      to: email,
      subject: "The superadmin had sent you a request to create your password",
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
        <h1>Vous pouvez creer vote mot de passe ici pour creer vote mot de passe</h1>
        <h2>Bonjour,</h2>

        <p>Veuillez cliquer sur ce lien pour creer votre mot de passe :</p>
        <a href=http://localhost:3000/create-password/${account._id}/${token}>Cliquez ici : http://localhost:3000/create-password/${account._id}/${token}
        </a>
        <p>Cordialement,<br>L'équipe du site</p>
    </div>
</body>

</html>
      `,
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

  try {
    const userdb = await User.findOne({ email });
    const accountdb = await Account.findOne({ email });
    if (!accountdb) {
      return res
        .status(400)
        .json({ msg: "No user found with this email, please check again." });
    }

    const secret = accountdb.password + process.env.JWT_SECRET;
    const token = jwt.sign(
      { email: accountdb.email, id: accountdb._id },
      secret,
      { expiresIn: "5m" }
    );

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
        <h1>Vous avez demandé à réinitialiser votre mot de passe</h1>
        <h2>Bonjour,</h2>

        <p>Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe :</p>
        <a href=http://localhost:3000/reset-password/${accountdb._id}/${token}>Cliquez ici : http://localhost:3000/reset-password/${accountdb._id}/${token}
        </a>
        <p>Cordialement,<br>L'équipe du site</p>
    </div>
</body>

</html>
      `,
      })
      .catch((err) => console.log(err));
    return res
      .status(200)
      .json({
        msg: "email with a link to reset your password has been sent successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        msg: "No user found with this email, please check again.",
        error,
      });
  }
};
// function to update new password after the verification of token
export const resetPassword = async (req, res) => {
  console.log("hello in the reset password");
  const { id, token } = req.params;

  const { password } = req.body;
  console.log(
    "🚀 ~ file: auth.js:313 ~ resetPassword ~ newPassword:",
    password
  );

  const account = await Account.findOne({ _id: id });

  if (!account) {
    return res.status(400).json({ msg: "No account found with this id." });
  }

  const secret = account.password + process.env.JWT_SECRET;

  try {
    const verify = jwt.verify(token, secret); // top check if they match

    //hashing new password
    const salt = await bcrypt.genSalt(); //13
    const hashedPassword = await bcrypt.hash(password, salt);

    await Account.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return res
      .status(200)
      .json({ msg: "Your Password has been updated successfully!" });
  } catch (error) {
    return res
      .status(400)
      .json({
        msg: "something went wrong with bcrypt or while saving the new password",
      });
  }
};

export const createPassword = async (req, res) => {
  console.log("hello in the create password");
  const { id, token } = req.params;
  console.log("🚀 ~ file: auth.js:534 ~ createPassword ~ req.params:", req.params)
  console.log("🚀 ~ file: auth.js:534 ~ createPassword ~ token:", token)
  console.log("🚀 ~ file: auth.js:534 ~ createPassword ~ id:", id)

  const { password } = req.body;
  console.log(
    "🚀 ~ file: auth.js:313 ~ resetPassword ~ newPassword:",
    password
  );

  const account = await Account.findOne({ _id: id });

  if (!account) {
    return res.status(400).json({ msg: "No account found with this id." });
  }

  const secret = process.env.JWT_SECRET;

  try {
    const verify = jwt.verify(token, secret); // top check if they match

    //hashing new password
    const salt = await bcrypt.genSalt(); //13
    const hashedPassword = await bcrypt.hash(password, salt);

    await Account.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return res
      .status(200)
      .json({ msg: "Your Password has been updated successfully!" });
  } catch (error) {
    return res
      .status(400)
      .json({
        msg: "something went wrong with bcrypt or while saving the new password",
      });
  }
};
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
export const sendConfirmationEmail = (name, email, activationCode) => {
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
           <h2> ${name},</h2>
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
};

// verify user when he clicks on confirmation link sent by email
export const verifyUser = (req, res) => {
  const activationCode = req.params.activationCode;

  // Use updateOne to directly update the user's isActive field
  Account.updateOne(
    { activationCode: activationCode },
    { $set: { isActive: true } }
  )
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
