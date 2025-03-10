"use client";

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Update user profile
router.put("/update", async (req, res) => {
 
  const { username, password } = req.body;

  try {

    const updatedData = {};
    if (username) updatedData.username = username;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username }, // Find user by username
      updatedData,
      { new: true } // Return updated user
    );

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