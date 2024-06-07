import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Protected routes

const protect = async (req, res, next) => {
  // Read the JWT from the cookie
  let token = req.cookies.jwt;

  if (token) {
    try {
      // It will return the payload as an object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
      // throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
    // throw new Error("Not authorized, no token");
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as a admin" });
    // res.status(401);
    // throw new Error("Not authorized as a admin");
  }
};

export { protect, admin };
