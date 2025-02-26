"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography, Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import Sidebar from "../component/Sidebar";
import UserTable from "../component/UserTable";
import AddUserForm from "../component/AddUserForm";

export default function AdminHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login");
    }
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User added successfully!");
        setShowForm(false);
        fetchUsers();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflowY: "auto" }}>
      <Sidebar setActiveTab={setActiveTab} setShowForm={setShowForm} />

    
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
        {activeTab === "dashboard" ? (
          <Typography variant="h4" sx={{ color: "black", fontWeight: "bold" }}>
            Welcome to Admin Dashboard
          </Typography>
        ) : (
          <>
            {!showForm ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={() => setShowForm(true)}
              >
                + ADD USER
              </Button>
            ) : (
              <AddUserForm onSubmit={onSubmit} />
            )}

            
            <UserTable users={users} />
          </>
        )}
      </Box>
    </Box>
  );
}




