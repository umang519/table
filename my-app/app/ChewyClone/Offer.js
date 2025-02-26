'use client'
import { Box, Link, Typography, Grid, Container } from '@mui/material';
import React from 'react';

function Offer() {
  const data = [
    { title: "Hi", linkText: "Sign In", linkUrl: "#" },
    { title: "Save 35% Today", linkText: "Set up Autoship", linkUrl: "#" },
    { title: "Recent Order", linkText: "Track Package", linkUrl: "#" },
    { title: "Chewy Pharmacy", linkText: "Shop Now", linkUrl: "#" },
  ];

  return (
    <Container maxWidth= "xl" disableGutters = "true">
    <Box sx={{ width: "100%", bgcolor: "#ffffff", px: 1, py: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <Grid container spacing={2} justifyContent="center">
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} textAlign="center">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "rgb(85,85,85)",
                mb: 0.5,
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              {item.title}
            </Typography>
            <Link
              href={item.linkUrl}
              sx={{
                color: "#1976d2",
                textDecoration: "none",
                fontSize: { xs: "12px", md: "14px" },
                fontWeight: "500",
                "&:hover": { textDecoration: "underline", color: "#555" },
              }}
            >
              {item.linkText}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  );
}

export default Offer;
