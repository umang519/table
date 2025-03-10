const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./db/connect'); // MongoDB connection file
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');
const addUser = require('./routes/addUser');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require("./routes/profileRoutes");
const cors = require('cors'); 
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ Fix CORS (Allow Frontend URL)
app.use(cors({
    origin: "https://table-gamma-three.vercel.app",  // Your Vercel frontend URL
    credentials: true
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/api', userRoutes);
app.use('/api', loginRoutes); 
app.use('/api', signupRoutes);
app.use('/api', addUser);
app.use('/api', adminRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('🔥 MongoDB Connection Successful!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
