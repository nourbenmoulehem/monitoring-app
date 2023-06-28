import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("🚀 ~ file: auth.js:5 ~ verifyToken ~ cookies:", cookies)
  const  token = cookies.split("=")[1];
  console.log(token)
  try {
    
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    
    next();
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  
};

// refresh token
