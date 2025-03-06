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

    if (!user.password) {
      return res.status(400).json({ message: "Please check your email and reset your password before logging in." });
    }

    // ✅ Always compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.resetToken && user.tokenExpiration > Date.now()) {
      return res.status(400).json({ message: "Password reset pending. Please reset your password before logging in." });
    }

    if (user.status === "inactive") {
      return res.status(400).json({ message: "User is inactive" });
    }

    
    const adminId = user.role === "trainee" ? user.adminId || "N/A" : user.role === "admin" ? user._id : null;

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({ 
      message: "Login successful", 
      user: { 
        id: user._id,  
        email: user.email,
        username: user.username,
        role: user.role,
        adminId: user.adminId,
      },  
      token 
    });

  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
