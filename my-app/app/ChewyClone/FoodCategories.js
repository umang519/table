import React from "react";
import { Box, Typography, Avatar, Link, Container } from "@mui/material";



const FoodCategories = () => {
  
    const food = [
        { name: "Dog Food", imageUrl: "/images/dogfood.avif", link: "#" },
        { name: "Dog Flea & Tick", imageUrl: "/images/dogflea.avif", link: "#" },
        { name: "Dog Treats", imageUrl: "/images/dogtreats.avif", link: "#" },
        { name: "Cat Food", imageUrl: "/images/catfood.avif", link: "#" },
        { name: "Cat Litter", imageUrl: "/images/catlitter.avif", link: "#" },
        { name: "Deals", imageUrl: "/images/deals.avif", link: "#" },
      ];
      
  return (
    <Container maxWidth= "xl" disableGutters = "true">
    <Box sx={{ margin: "auto", padding: 2 }}>
      <Typography
        variant="h4"
        fontWeight="600"
        textAlign="left"
        fontSize="20px"
        color="rgb(18,18,18)"
        gutterBottom
      >
        Explore popular categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          scrollBehavior: "smooth",
          width: "100%",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          gap: 5,
          p: 1,
        }}
      >
        {food.map((category, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              color: "rgb(18,18,18)",
              fontSize: "18px",
              fontWeight: "400",
              mt: "2",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Avatar
              src={category.imageUrl}
              alt={category.name}
              sx={{ width: 250, height: 200, margin: "auto" }}
            />

            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link href={category.link} underline="hover">
                {category.name}
              </Link>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
    </Container>
  );
};

export default FoodCategories;
