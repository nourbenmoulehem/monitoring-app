import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(403).send("Access Denied");
  }
  

  const  token = cookies.split("=")[1];

  const  id = cookies.split("=")[0];

  req.user = await User.findById(id);

  console.log(token);
  try {
    
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = verified;
    


    req._id = verified._id;

    next();
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  
};

  