import User from "../models/User.js";

// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { name, phoneNumber },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};
