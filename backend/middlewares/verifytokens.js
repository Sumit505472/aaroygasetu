import admin from "../config/firebase.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    // Get full user from MongoDB
    const user = await User.findOne({ uid: decoded.uid });

    if (!user) {
      return res.status(401).json({ message: "User not found in database" });
    }

    req.user = user; // full user object from DB (with role)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
