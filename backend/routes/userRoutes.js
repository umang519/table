const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.get("/users", async (req, res) => {
  try {
    const { traineeId } = req.query;

    if (!traineeId) {
      return res.status(400).json({ message: "Trainee ID is required" });
    }

    const users = await User.find({ role: "user", traineeId });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "umangprajapati19504@gmail.com",
    pass: "wxey kaqh dnfl mpbe",
  },
});

//ADD USER & SEND INVITATION EMAIL
router.post("/trainees/:traineeId/users", async (req, res) => {
  try {
    const { username, email } = req.body;
    const { traineeId } = req.params;

    if (!username || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password: "",
      role: "user",
      traineeId,
      status: "active",
      progressStatus: "Invitation Sent",
    });

    await newUser.save();

    // Generate JWT Token (Valid for 5 Minutes)
    const token = jwt.sign({ email: newUser.email }, "your_secret_key", {
      expiresIn: "5m",
    });

    // Send Email with Reset Password Link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: "umangprajapati19504@gmail.com",
      to: email,
      subject: "Welcome to Our Platform - Reset Your Password",
      html: `<p>Hello <b>${username}</b>,</p>
           <p>Your account has been successfully created.</p>
           <p><b>Email:</b> ${email}</p>
           
           <p>Before logging in, please reset your password using the button below:</p>
           <p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 10px 20px; font-size: 16px; 
             color: #fff; background-color: #007BFF; text-decoration: none; 
             border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p><b>Note:</b> The reset password link is valid for only 5 minutes.</p>
           <p>Best Regards,</p>
           <p>Team</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email sending failed:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "Email sending failed",
            error: err,
          });
      }
      console.log("Email sent successfully:", info.response);
      return res.json({
        success: true,
        message: "User added successfully and email sent",
      });
    });

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error",
        error: error.toString(),
      });
  }
});

// ACCEPT INVITATION
router.post("/accept-invitation", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key");

    // Find user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    if (user.progressStatus === "Invitation Sent") {
      user.progressStatus = "Invitation Accepted";
      await user.save();
    }

    // Set a fixed delay of 1 minute (instead of waiting for the token to expire)
    setTimeout(async () => {
      const updatedUser = await User.findOne({ email: decoded.email });
      if (updatedUser && updatedUser.progressStatus === "Invitation Accepted") {
        updatedUser.progressStatus = "Password Not Set";
        await updatedUser.save();
      }
    }, 60 * 1000); // 1 minute

    res.json({ message: "Invitation accepted." });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, "your_secret_key");

    // Find user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Check if the password was already set
    if (user.password && user.progressStatus === "Password Changed") {
      return res
        .status(400)
        .json({
          message: "Password is already set. Use Forgot Password instead.",
        });
    }

    // Validate new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Update password and progress status
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.progressStatus = "Password Changed";
    user.invitationAccepted = true;

    await user.save();

    res.json({ message: "Password successfully updated. You can now log in." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    if (user.progressStatus === "Invitation Sent") {
      return res.status(400).json({ message: "Invitation has been sent. Check your email." });
    } else if (user.progressStatus === "Invitation Accepted") {
      return res.status(400).json({ message: "Invitation is not accepted. Accept first through your mail." });
    }

    // ✅ Generate a new random password
    const newPassword = crypto.randomBytes(4).toString("hex");

    // ✅ Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update user's password and progress status
    user.password = hashedPassword;
    user.progressStatus = "Password Changed";
    
    // ✅ Ensure the password is updated in the database
    await user.save();

    // ✅ Verify if the password is successfully updated
    const updatedUser = await User.findOne({ email });
    if (!updatedUser || !(await bcrypt.compare(newPassword, updatedUser.password))) {
      return res.status(500).json({ message: "Error updating password. Try again." });
    }

    // ✅ Send email with the new password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "umangprajapati19504@gmail.com",
        pass: "wxey kaqh dnfl mpbe",
      },
    });

    const mailOptions = {
      from: "umangprajapati19504@gmail.com",
      to: email,
      subject: "Your New Temporary Password",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Password Reset</h2>
          <p>Hello,</p>
          <p>Your new temporary password is: <strong>${newPassword}</strong></p>
          <p>Please log in and change your password immediately.</p>
          <a href="http://localhost:3000/login" 
             style="display: inline-block; padding: 10px 20px; font-size: 16px; 
                    color: white; background-color: #007bff; text-decoration: none; 
                    border-radius: 5px;">
            Login
          </a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "A new password has been sent to your email. Please change it after logging in." });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/admins", async (req, res) => {
  if (req.query.role) {
    filter.role = req.query.role;
  }

  try {
    const admins = await User.find(
      { role: "admin" },
      "username email password status role"
    );

    res.status(200).json({
      admins,
      totalAdmins: admins.length,
    });
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
});

router.post("/admins", async (req, res) => {
  try {
    const { username, email, password, status } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json.apply({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //new admin
    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      status: status || "active",
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "admin added successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error addind admin: ", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
});

router.post("/trainees", async (req, res) => {
  try {
    const { username, email, password, adminId } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !adminId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if trainee already exists
    const existingTrainee = await User.findOne({ email });
    if (existingTrainee) {
      return res
        .status(400)
        .json({ message: "Trainee with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new trainee
    const newTrainee = new User({
      username,
      email,
      password: hashedPassword,
      role: "trainee",
      adminId,
      status: "active",
    });

    await newTrainee.save();

    res
      .status(201)
      .json({ message: "Trainee added successfully", trainee: newTrainee });
  } catch (error) {
    console.error("Error adding trainee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/trainees", async (req, res) => {
  try {
    const { adminId } = req.query; // Extract adminId from query params
    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const trainees = await User.find(
      { role: "trainee", adminId },
      "username email status adminId"
    );
    res.status(200).json({ trainees });
  } catch (error) {
    console.error("Error fetching trainees:", error);
    res.status(500).json({ message: "Error fetching trainees" });
  }
});

router.get("/admins/:adminId/trainees", async (req, res) => {
  try {
    const { adminId } = req.params;
    const trainees = await User.find({ role: "trainee", adminId: adminId });
    res.json({ trainees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainees" });
  }
});

router.get("/trainees/:traineeId/users", async (req, res) => {
  try {
    const { traineeId } = req.params;
    console.log("Fetching users for trainee:", traineeId);

    const users = await User.find({ role: "user", traineeId });

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.patch("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Status updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.put("/trainees/:traineeId", async (req, res) => {
  try {
    const { traineeId } = req.params;
    const updatedTrainee = await User.findByIdAndUpdate(traineeId, req.body, {
      new: true,
    });

    if (!updatedTrainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.json({
      message: "Trainee updated successfully",
      trainee: updatedTrainee,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/trainees/:traineeId", async (req, res) => {
  try {
    const { traineeId } = req.params;
    const deletedTrainee = await User.findByIdAndDelete(traineeId);

    if (!deletedTrainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.json({ message: "Trainee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
