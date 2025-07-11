import admin from "../config/firebase.js";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Fetch or create user in MongoDB
    let user = await User.findOne({ uid });

    if (!user) {
      // ⚠️ For now, you can pass `role` from frontend or default to 'patient'
      const role = req.body.role || "patient";

      user = new User({ uid, email, name, role });
      await user.save();
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
