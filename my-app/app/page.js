"use client"; // ✅ Required for Client Components in Next.js App Router

import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation for App Router

const HomePage = () => {
  const router = useRouter(); // ✅ Next.js App Router navigation

  return (
    <Container 
      maxWidth="md" 
      sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Typography style={{ color: "black" }} variant="h4" gutterBottom>
        Welcome to Landing Page
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => router.push("/login")} // ✅ Navigate using Next.js
        sx={{ mt: 2, px: 4, py: 1.5, fontSize: "1.2rem" }}
      >
        Login
      </Button>
    </Container>
  );
};

export default HomePage;
