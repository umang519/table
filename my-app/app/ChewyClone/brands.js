import React, { useRef, useState } from "react";
import { Box, Typography, IconButton, Avatar, Link } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const brands = [
  { imageUrl: "/images/proplan.avif", link: "#" },
  { imageUrl: "/images/hill.avif", link: "#" },
  { imageUrl: "/images/blue.avif", link: "#" },
  { imageUrl: "/images/royal.avif", link: "#" },
  { imageUrl: "/images/friskies.avif", link: "#" },
  { imageUrl: "/images/greenies.avif", link: "#" },
  { imageUrl: "/images/fancy.avif", link: "#" },
  { imageUrl: "/images/frisco.avif", link: "#" },
  { imageUrl: "/images/bark.avif", link: "#" },
  { imageUrl: "/images/temptations.avif", link: "#" },
  { imageUrl: "/images/nexgard.avif", link: "#" },
  { imageUrl: "/images/tidycats.avif", link: "#" },
];

const BrandsSection = () => {
  const brandScrollRef = useRef(null);
  const [brandScrollPosition, setBrandScrollPosition] = useState(0);

  const scrollBrands = (direction) => {
    const scrollAmount = 300;
    const container = brandScrollRef.current;

    if (container) {
      const newPosition =
        direction === "left"
          ? brandScrollPosition - scrollAmount
          : brandScrollPosition + scrollAmount;

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setBrandScrollPosition(newPosition);
    }
  };

  return (
    <Box sx={{ margin: "auto", padding: 2, position: "relative" }}>
      <Typography
        variant="h4"
        fontWeight="600"
        textAlign="left"
        fontSize="20px"
        color="rgb(18,18,18)"
        gutterBottom
      >
        Brands our customers love
      </Typography>

      {brandScrollPosition > 0 && (
        <IconButton
          onClick={() => scrollBrands("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#1c49c2",
            boxShadow: 2,
            color: "white",
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      <Box
        ref={brandScrollRef}
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
        {brands.map((category, index) => (
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
                border: "1px solid black",
              },
            }}
          >
            <Avatar
              src={category.imageUrl}
              alt={category.name}
              sx={{
                width: 250,
                height: 200,
                margin: "auto",
              }}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link href={category.link} underline="hover">
                {category.name}
              </Link>
            </Typography>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scrollBrands("right")}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "#1c49c2",
          boxShadow: 2,
          color: "white",
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default BrandsSection;
