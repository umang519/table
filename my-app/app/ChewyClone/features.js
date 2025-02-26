import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'

function Features() {
    const features = [
        {
          image: "/images/layout1.avif", // Replace with your actual image URLs
          title: "High quality, low prices",
          description: "Keep your pet happy & healthy with great prices on the best products.",
        },
        {
          image: "/images/layout2.avif",
          title: "Fast delivery",
          description: "Get everything delivered right to your door with fast, 1-3 day delivery.",
        },
        {
          image: "/images/layout3.avif",
          title: "Free 365-day returns",
          description: "If you & your pet aren't 100% satisfied, return your items within a year at no cost.",
        },
        {
          image: "/images/layout4.avif",
          title: "24/7 support",
          description: "Got questions? We got you 24/7. Our pet experts are just a call, e-mail or chat away.",
        },
      ];

  return (
    <Container maxWidth= "xl" disableGutters = "true">
  <Box>
  <Box sx={{ px: 4, py: 6, backgroundColor: "#f9f9f9" }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  backgroundColor: "white",
                  overflow: "hidden",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                {/* Content */}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", lineHeight: 1.5 }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
  </Box>
  </Container>
  )
}

export default Features;