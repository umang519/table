const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Update with your actual User model path

async function hashExistingPasswords() {
  try {
    await mongoose.connect("mongodb://localhost:27017/training", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find(); // Fetch all users

    for (const user of users) {
      if (!user.password.startsWith("$2a$") && !user.password.startsWith("$2b$")) {
        // Password is plain text, hash it
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        console.log(`Updated password for ${user.email}`);
      }
    }

    console.log("✅ All plaintext passwords have been hashed.");
  } catch (error) {
    console.error("❌ Error updating passwords:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the migration
hashExistingPasswords();
