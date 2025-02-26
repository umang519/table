import React, { useRef, useState } from "react";
import { Box, Typography, Link, IconButton, Avatar, Container, } from "@mui/material";
import { ChevronLeft, ChevronRight  } from "@mui/icons-material";

const animalData = [
    { name: 'Dog', imageUrl: '/images/dog.avif', link: "#" },
    { name: 'Cat', imageUrl: '/images/cat.avif', link: "#" },
    { name: 'Horse', imageUrl: '/images/horse.avif', link: "#" },
    { name: 'Wild Bird', imageUrl: '/images/wild_bird.avif', link: "#" },
    { name: 'Wildlife', imageUrl: '/images/wildlife.avif', link: "#" },
    { name: 'Small Pet', imageUrl: '/images/smallpet.avif', link: "#" },
    { name: 'Pet', imageUrl: '/images/petbird.avif', link: "#" },
    { name: 'Farm Animal', imageUrl: '/images/farmanimal.avif', link: "#" },
    { name: 'Reptile', imageUrl: '/images/reptile.avif', link: "#" },
    { name: 'Fish', imageUrl: '/images/fish.avif', link: "#" },

];

export default function Animal() {

    const animalScrollRef = useRef(null);
    const [animalScrollPosition, setAnimalScrollPosition] = useState(0);

    const scroll = (direction, type) => {
        const container = type === "animal" ? animalScrollRef.current : productScrollRef.current;
        const scrollAmount = 300;
        const setScrollPosition = type === "animal" ? setAnimalScrollPosition : setProductScrollPosition;
        const scrollPosition = type === "animal" ? animalScrollPosition : productScrollPosition;
    
        if (container) {
          const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
          container.scrollTo({ left: newPosition, behavior: "smooth" });
          setScrollPosition(newPosition);
        }
      };



   return (
    <Container maxWidth= "xl" disableGutters = "true">
    <Box sx={{ textAlign: "left", p: { xs: 2, sm: 3}, position: "relative" }}>
    <Typography variant="h6" color="rgb(18,18,18)" fontWeight="600" fontSize={{ xs: "16px", sm: "18px"}} gutterBottom>
      Who are you shopping for today?
    </Typography>
    {animalScrollPosition > 0 && (
      <IconButton
        onClick={() => scroll("left", "animal")}
        sx={{ position: "absolute", left: { xs: 5, sm: 0 }, top: "50%", transform: "translateY(-50%)", zIndex: 10, bgcolor: "#1c49c2", boxShadow: 2, color: "white" }}
      >
        <ChevronLeft />
      </IconButton>
    )}
    <Box
      ref={animalScrollRef}
      sx={{
        display: "flex",
        alignItems: "center",
        overflowX: "auto",
        scrollBehavior: "smooth",
        width: "100%",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        "&:: -webkit-scrollbar": {
          display: "none",
        },
        gap: { xs: 2, sm: 5},
        p: 1,
      }}
    >
      {animalData.map((category, index) => (

        <Box key={index} sx={{
          textAlign: "center", color: "rgb(18,18,18)", fontSize: "16px", fontWeight: "400", mt: "2", textDecoration: "none",
          cursor: "pointer",
          "&: hover": {
            textDecoration: "underline",
          }
          , minWidth: { xs: 120, sm: 250 },
        }}>
          <Avatar
            src={category.imageUrl}
            alt={category.name}
            sx={{ width:{ xs: 100, sm: 250} , height:{ xs: 100, sm: 200}, margin: "auto", }}
          />

          <Typography variant="body2"
            sx={{ mt: 2, fontSize: { xs: "14px" , sm: "16px" } }}><Link href={category.link} underline="hover">{category.name}</Link></Typography>
        </Box>
      ))}
    </Box>
    <IconButton
      onClick={() => scroll("right", "animal")}
      sx={{ position: "absolute", right: { xs: 5, sm: 0 }, top: "50%", transform: "translateY(-50%)", zIndex: 10, bgcolor: "#1c49c2", boxShadow: 2, color: "white" }}
    >
      <ChevronRight />
    </IconButton>
  </Box>
  </Container>
   );

};