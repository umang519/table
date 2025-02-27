const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Update user profile
router.put("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;

  try {
    const updatedData = { username };
    if (password) {
      updatedData.password = password; // Store as plain text if needed
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
