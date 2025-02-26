const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

router.post("/trainees/:traineeId/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { traineeId } = req.params;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user under trainee
    const newUser = new User({
      username,
      email,
      password,
      role: "user",
      traineeId,
      status: "active",
    });

    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/admins", async (req, res) => {
  if (req.query.role) {
    filter.role = req.query.role;
  }
  
  try {
    const admins = await User.find({ role: "admin" }, "username email password status role");
    
    res.status(200).json({
      admins,
      totalAdmins: admins.length,
    });
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
});

router.post("/admins", async (req, res) => {
  try {
    const { username, email, password, status } = req.body;

    const existingUser = await User.findOne( { email });
    if (existingUser) {
      return res.status(400).json.apply({ message: "Email already in use"});
    }

    //new admin
    const newAdmin = new User({
      username,
      email,
      password,
      status: status || "active",
      role: "admin"
    });

    await newAdmin.save();

    res.status(201).json({
      message:"admin added successfully",
      admin: newAdmin,
    });
  } catch (error){
     console.error("Error addind admin: ", error);
     res.status(500).json({message: "server error", error: error.message});
  }
})

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
      return res.status(400).json({ message: "Trainee with this email already exists" });
    }

    // Create new trainee
    const newTrainee = new User({
      username,
      email,
      password,
      role: "trainee",
      adminId,
      status: "active", 
    });

    await newTrainee.save();

    res.status(201).json({ message: "Trainee added successfully", trainee: newTrainee });
  } catch (error) {
    console.error("Error adding trainee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/admins/:adminId/trainees", async (req, res) => {
  try {
    const { adminId } = req.params;
    const trainees = await User.find({ role: "trainee", adminId });
    res.json({ trainees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainees" });
  }
});

router.get("/trainees/:traineeId/users", async (req, res) => {
  try {
    const { traineeId } = req.params;
    console.log("Fetching users for trainee:", traineeId); // Debugging

    const users = await User.find({ role: "user", traineeId });

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/trainees", async (req, res) => {
  try {
    const trainees = await User.find({ role: "trainee" }, "username email status adminId");

    res.status(200).json({ trainees });
  } catch (error) {
    console.error("Error fetching trainees:", error);
    res.status(500).json({ message: "Error fetching trainees" });
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
    const updatedTrainee = await User.findByIdAndUpdate(traineeId, req.body, { new: true });

    if (!updatedTrainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.json({ message: "Trainee updated successfully", trainee: updatedTrainee });
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
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
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
