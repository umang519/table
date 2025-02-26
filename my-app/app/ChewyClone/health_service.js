import { Box, Card, CardContent, CardMedia, Grid, Typography, Container } from "@mui/material";
import React from "react";

function Healthservice() {
  const services = [
    {
      title: "Pharmacy",
      description: "Filling your pet prescriptions couldn’t be easier.",
      image: "/images/Dpharmacy.avif",
    },
    {
      title: "CarePlus",
      description: "Insurance plans that give your pet coverage.",
      image: "/images/Dcareplus.avif",
    },
    {
      title: "Connect with a vet",
      description: "Get live vet help in an instant via chat or video.",
      image: "/images/Dchewy.avif",
    },
  ];

  return (
    <Container maxWidth= "xl" disableGutters = "true">
    <Box sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="left"
        fontSize={{ xs: "18px", md: "20px" }}
        color="rgb(18,18,18)"
        gutterBottom
      >
        Discover our health services
      </Typography>

      {/* Responsive Grid for Services */}
      <Grid container spacing={3} sx={{ width: "100%", margin: "0 auto" }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: "100%", boxShadow: 2 }}>
              <CardMedia component="img" image={service.image} alt={service.title} sx={{ height: { xs: 180, md: 250 } }} />
              <CardContent>
                <Typography variant="h6" fontWeight={600} textAlign="center">
                  {service.title}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  );
}

export default Healthservice;
