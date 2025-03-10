// app.js (or your main server file)
const express = require('express');
const bodyParser = require("express").json;
const connectDB = require('./db/connect'); //connect file
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
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

//enable cors
app.use(cors());
app.use(bodyParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api', loginRoutes); 
app.use('/api', signupRoutes);
app.use('/api', addUser);
app.use('/api', adminRoutes);
app.use("/api/profile", profileRoutes);
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('🔥 MongoDB Connection Successful!');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
