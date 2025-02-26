const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  signupMethod: { type: String, enum: ["admin", "user"] }, 
  role: { type: String, enum: ["superadmin", "admin", "trainee", "user"], default: "user" }, // Added 'trainee'
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  traineeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Added 'adminId'
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema, 'users');
