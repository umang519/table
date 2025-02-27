"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  Avatar,
  CardContent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function UserHomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    // Get user details from cookies
    const userId = Cookies.get("userId") || "";
    const userRole = Cookies.get("userRole") || "User";
    const email = Cookies.get("email") || "Not Available";
    const username = Cookies.get("username") || "User";
    const password = Cookies.get("password") || "";

    setUser({ userId, role: userRole, email, username, password });
    setUpdatedUser({ username, password }); // Set initial form data
  }, [router]);

  const handleLogout = () => {
    [
      "authToken",
      "userId",
      "userRole",
      "email",
      "username",
      "password",
    ].forEach((cookie) => Cookies.remove(cookie));
    router.push("/login");
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log("Sending data to server:", { 
      userId: user?.userId, 
      username: updatedUser.username, 
      password: updatedUser.password 
    });
  
    try {
      const response = await fetch(`http://localhost:5000/api/profile/update/${user.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId, // Ensure this is defined
          username: updatedUser.username,
          password: updatedUser.password,
        }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        setUser({ ...user, username: updatedUser.username });
        Cookies.set("username", updatedUser.username);
        alert("Profile updated successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  
  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#2c3e50",
          padding: "20px",
          color: "#fff",
          height: "100vh",
        }}
      >
        <Typography variant="h6">DASHBOARD</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          style={{ marginTop: "auto" }}
        >
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        {user ? (
          <Card
            sx={{
              width: 400,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#2c3e50",
                marginBottom: 2,
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <CardContent sx={{ textAlign: "center" }}>
              {editMode ? (
                <>
                  <TextField
                    label="Username"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    value={user.email}
                    fullWidth
                    margin="normal"
                    disabled
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={updatedUser.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mt: 2, ml: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditMode(false)}
                    sx={{ mt: 2, ml: 1 }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight="bold">
                    Welcome, {user.username}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Role: {user.role}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Password: {user.password}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h4" sx={{ color: "black" }}>
            Loading...
          </Typography>
        )}
      </Box>
    </div>
  );
}
