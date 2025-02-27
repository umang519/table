const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.status === "inactive") {
      return res.status(400).json({ message: "User is inactive" });
    }

    // Check password (Only allow plaintext for superadmin, hash check for others)
    if (["superadmin", "admin", "trainee", "user"].includes(user.role)) {
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const adminId = user.role === "admin" ? user._id : user.adminId || null;

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      { expiresIn: "7d" }
    );

    // Convert Mongoose document to plain object to include password
    const userData = user.toObject();

    return res.status(200).json({ 
      message: "Login successful", 
      user: { ...userData, adminId }, 
      id: user._id,  
      email: user.email,
      username: user.username,
      password: user.password, // ✅ Password is included in response
      token 
    });

  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
