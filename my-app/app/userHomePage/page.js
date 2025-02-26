"use client";

import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function UserHomePage() {

    const router = useRouter();

     
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
          router.push("/login"); // Redirect if no token
        }
      }, [router]);


    const handleLogout = () => {
        Cookies.remove("authToken");
        router.push("/login");
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

      {/* Main Content (Empty or Welcome Message) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "black"}}>Welcome to User Dashboard</Typography>
      </Box>
    </div>
  );
}
