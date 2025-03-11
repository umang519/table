const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ 1. Get all admins
router.get("/admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }, "username email status");
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
});

// ✅ 2. Add a new admin
router.post("/admins", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin (without hashing password)
    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      signupMethod: "admin",
      status: "active"
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error adding admin", error: error.message });
  }
});

// ✅ 3. Edit an admin
router.put("/admins/:id", async (req, res) => {
  try {
    const { username, email, password, status } = req.body;
    let updateData = { username, email, status};

    if(password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error: error.message });
  }
});

// ✅ 4. Delete an admin
router.delete("/admins/:id", async (req, res) => {
  try {
    const deletedAdmin = await User.findByIdAndDelete(req.params.id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error: error.message });
  }
});

module.exports = router;
