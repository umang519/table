"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stack,
  Container,
} from "@mui/material";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
  StarBorder,
  ChatBubbleOutline,
  Email,
  ArrowUpward,
} from "@mui/icons-material";
import Header from "./Header";
import ImageCarousel from "./ImageCarousel";
import Animal from "./Animal";
import FoodCategories from "./FoodCategories";
import BrandsSection from "./brands";
import Phone from "@mui/icons-material/Phone";

import Features from "./features";
import Healthservice from "./health_service";
import Offer from "./Offer";

export default function Page() {
  const products = [
    {
      id: 1,
      image: "/images/AJ.avif",
      brand: "American Journey",
      name: "Turkey & Chicken Recipe Grain-Free Dry Cat Food, 12-lb bag",
      rating: 4.3,
      reviews: 2262,
      price: 37.99,
      oldPrice: 41.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card",
      badge: "New Look",
    },
    {
      id: 2,
      image: "/images/bc.avif",
      brand: "Bones & Chews",
      name: 'Made in USA Roasted Marrow Bone 6" Dog Treat, 1 count',
      rating: 4.3,
      reviews: 9915,
      price: 5.49,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +1 deal",
    },
    {
      id: 3,
      image: "/images/aj2.avif",
      brand: "American Journey",
      name: "Stews Poultry & Beef Variety Pack Grain-Free Canned Dog Food, 12.5-oz can, case of 12",
      rating: 4.1,
      reviews: 2109,
      price: 29.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card",
    },
    {
      id: 4,
      image: "/images/frisco.avif",
      brand: "Frisco",
      name: "Multi-Cat Unscented Clumping Clay Cat Litter, 40-lb bag",
      rating: 4.3,
      reviews: 10000,
      price: 17.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +1 deal",
    },
    {
      id: 5,
      image: "/images/tt.avif",
      brand: "Tiny Tiger",
      name: "Lickables Bisque Variety Pack Cat Treat & Topper, 1.4-oz pouch, case of 12",
      rating: 4.4,
      reviews: 590,
      price: 11.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card",
    },
    {
      id: 6,
      image: "/images/bcdeals.avif",
      brand: "Bones & Chews",
      name: "All-Natural Beef Lung Dehydrated Dog Treats, 12-oz bag",
      rating: 4.5,
      reviews: 111,
      price: 23.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +2 deals",
      badge: "Deal",
    },
    {
      id: 7,
      image: "/images/ajgrain.avif",
      brand: "American Journey",
      name: "Grain-Free Salmon & Sweet Potato Recipe Dry Dog Food, 24-lb bag",
      rating: 4.4,
      review: 4445,
      price: 59.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +2 deals",
      badge: "Deal",
    },
    {
      id: 8,
      image: "/images/ajlandmark.avif",
      brand: "American Journey",
      name: "Landmark Chicken Fillets Cat Food Toppers, 1.06-oz, pack of 10",
      rating: 4.7,
      review: 99,
      price: 19.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card",
      badge: "Deal",
    },
    {
      id: 9,
      image: "/images/bcstandard.webp",
      brand: "Bones & Chews",
      name: "Standard Bully Stick 6'' Dog Treats, 6 count ",
      rating: 4.4,
      review: 4445,
      price: 59.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +2 deals",
      badge: "Deal",
    },
    {
      id: 10,
      image: "/images/taf.avif",
      brand: "True Acre Foods",
      name: "All-Natual Dental Chew Sticks, Peanut Butter Flavor, 32 count",
      rating: 4.6,
      review: 2086,
      price: 11.99,
      deal: "Buy 1, get 2nd 50% off with code SMILE +1 deal",
      badge: "Deal",
    },
    {
      id: 11,
      image: "/images/bcall.avif",
      brand: "Bones & Chews",
      name: "All-Natual Grain-Free Jerky Made with Real Beef Dog Treats, 22-oz bag",
      rating: 4.5,
      review: 2378,
      price: 12.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +2 deals",
      badge: "Deal",
    },
    {
      id: 12,
      image: "/images/bcusa.avif",
      brand: "Bones & Chews",
      name: "Made in USA Turkey Tendon Dog Treats, 16-oz bag",
      rating: 4.4,
      review: 1120,
      price: 44.99,
      deal: "New Customers Only: Spend $49+, Get $20 eGift Card +2 deals",
      badge: "Deal",
    },
  ];

  const productScrollRef = useRef(null);

  const [productScrollPosition, setProductScrollPosition] = useState(0);

  const scroll = (direction, type) => {
    const container =
      type === "animal" ? animalScrollRef.current : productScrollRef.current;
    const scrollAmount = 300;
    const setScrollPosition =
      type === "animal" ? setAnimalScrollPosition : setProductScrollPosition;
    const scrollPosition =
      type === "animal" ? animalScrollPosition : productScrollPosition;

    if (container) {
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container maxWidth="2xl" disableGutters="true">
        <Container maxWidth="2xl" disableGutters="true">
          <Header />
        </Container>

        <Container maxWidth="2xl" disableGutters="true">
          <Container maxWidth="2xl" disableGutters="true">
            {/* third AppBar */}
            <ImageCarousel />

            <Offer />

            <Features />

            <Animal />

            <Box
              sx={{ width: "100% ", display: "flex", justifyContent: "center" }}
            >
              {" "}
              <Healthservice />
            </Box>

            <Container maxWidth="xl" disableGutters="true">
              <Box sx={{ margin: "auto", mt: 4, padding: 2 }}>
                <Image
                  src="/images/OneImage.avif"
                  alt="Single image"
                  layout="responsive"
                  width="1200"
                  height="1200"
                  objectFit="cover"
                />
              </Box>
            </Container>

            <FoodCategories />

            <Container maxWidth="xl" disableGutters="true">
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  overflow: "hidden",
                  padding: 2,
                  paddingBottom: "10px",
                  objectFit: "contain",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "rgb(18,18,18)",
                    fontSize: "20px",
                  }}
                >
                  Explore top picks, created by our very own experts
                </Typography>
                {productScrollPosition > 0 && (
                  <IconButton
                    onClick={() => scroll("left", "product")}
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
                  ref={productScrollRef}
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      sx={{ minWidth: 200, marginRight: "15px" }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          sx={{
                            objectFit: "contain",
                            width: "100%",
                            height: "220px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            bgcolor: "white",
                          }}
                          component="img"
                          height="180"
                          image={product.image}
                          alt={product.name}
                        />
                        {product.badge && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              left: 8,
                              backgroundColor:
                                product.badge === "Deal" ? "red" : "black",
                              color: "white",
                              padding: "3px 7px",
                              borderRadius: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {product.badge}
                          </Box>
                        )}
                      </Box>
                      <CardContent>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {product.brand}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ height: "40px", overflow: "hidden" }}
                        >
                          {product.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: "5px 0",
                          }}
                        >
                          {Array.from({ length: 5 }).map((_, index) => {
                            if (index + 1 <= Math.floor(product.rating))
                              return (
                                <Star
                                  key={index}
                                  sx={{ color: "#FFA500", fontSize: 16 }}
                                />
                              );
                            if (index < product.rating)
                              return (
                                <StarHalf
                                  key={index}
                                  sx={{ color: "#FFA500", fontSize: 16 }}
                                />
                              );
                            return (
                              <StarBorder
                                key={index}
                                sx={{ color: "#FFA500", fontSize: 16 }}
                              />
                            );
                          })}
                          <Typography
                            variant="body2"
                            sx={{ marginLeft: "5px" }}
                          >
                            {product.rating} ({product.reviews})
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            ${product.price.toFixed(2)}
                          </Typography>
                          {product.oldPrice && (
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              ${product.oldPrice.toFixed(2)}
                            </Typography>
                          )}
                        </Box>

                        {product.deal && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginTop: "5px", fontSize: "12px" }}
                          >
                            {product.deal}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                <IconButton
                  onClick={() => scroll("right", "product")}
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
              <BrandsSection />
            </Container>
            <Container
              maxWidth="2xl"
              disableGutters="true"
              sx={{ backgroundColor: "#1C49C2" }}
            >
              <Container maxWidth="xl" disableGutters="true">
                <Box
                  component="footer"
                  sx={{
                    backgroundColor: "#0056D2",
                    color: "white",
                    py: 2,
                    px: 3,
                    textAlign: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                    sx={{
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {/* Header */}
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "16px", fontWeight: "600", mr: 2 }}
                    >
                      Our experts are available 24/7:
                    </Typography>

                    {/* Phone */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Phone fontSize="small" />
                      1-800-672-4399
                    </Typography>

                    {/* Chat */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <ChatBubbleOutline fontSize="small" />
                      <Link href="#" underline="none" color="inherit">
                        chat now
                      </Link>
                    </Typography>

                    {/* Email */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Email fontSize="small" />
                      <Link
                        href="mailto:support@example.com"
                        underline="none"
                        color="inherit"
                      >
                        email us
                      </Link>
                    </Typography>

                    {/* Back to Top Button */}
                    <Button
                      variant="outlined"
                      onClick={scrollToTop}
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1c49c2",
                        backgroundColor: "white",
                        borderColor: "white",
                        borderRadius: "30px",
                        px: 3,
                        py: 0.5,
                        textTransform: "none",
                      }}
                      startIcon={<ArrowUpward />}
                    >
                      Back to Top
                    </Button>
                  </Stack>
                </Box>
              </Container>
            </Container>
            <Container maxWidth="xl" disableGutters="true">
              <Box
                component="section"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  flexWrap: "wrap",
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: { xs: 0, md: 25 },
                    }}
                  >
                    <Image
                      src="/images/flag.png"
                      alt="United States Flag"
                      width={20}
                      height={14}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        marginLeft: "5px",
                        color: "rgb(18,18,18)",
                      }}
                    >
                      United States
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      color: "rgb(18,18,18)",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: "20px",
                    }}
                  >
                    {[
                      "About",
                      "Investor Relations",
                      "Affiliates",
                      "Jobs",
                      "FAQs",
                      "Blog",
                      "Give Back",
                      "Gift Guide",
                      "Gift Cards",
                    ].map((link, index) => (
                      <Link
                        key={index}
                        href="#"
                        underline="none"
                        sx={{
                          color: "black",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            textDecoration: "underline",
                            border: "1px solid black",
                          },
                        }}
                      >
                        {link}
                      </Link>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  {[
                    { src: "/images/fb.png", bgColor: "#1877F2" },
                    { src: "/images/yt.png", bgColor: "#FF0000" },
                    { src: "/images/insta.jpg", bgColor: "#E1306C" },
                    { src: "/images/tiktok.png", bgColor: "black" },
                  ].map((item, index) => (
                    <Avatar
                      key={index}
                      sx={{ bgcolor: item.bgColor, width: 40, height: 40 }}
                    >
                      <Image
                        src={item.src}
                        alt="Social Icon"
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                      />
                    </Avatar>
                  ))}
                </Box>
              </Box>
            </Container>
            <Container maxWidth="xl" disableGutters="true">
              <Box sx={{ margin: "auto", mt: 1, padding: 1 }}>
                <Image
                  src="/images/footer.png"
                  alt="Single image"
                  layout="responsive"
                  width="1200"
                  height="1200"
                  objectFit="cover"
                />
              </Box>
            </Container>

            <hr
              style={{
                border: "none",
                height: "3px",
                backgroundColor: "#e0e0e0",
                margin: "20px 0",
              }}
            />
            <Container maxWidth="xl" disableGutters="true">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  color: "#555",
                  backgroundColor: "#f9f9f9",
                  flexWrap: "wrap",
                }}
              >
                {/* Copyright */}
                <Typography sx={{ fontSize: "14px", color: "#555" }}>
                  Copyright © 2025, Chewy, Inc.
                </Typography>

                {/* Links */}
                <Link href="#" underline="hover" color="inherit">
                  Terms of Use
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Privacy Policy (Updated Apr 29, 2024)
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Interest-Based Ads
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Accessibility
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  California Supply Chains Act
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Vendor Compliance
                </Link>

                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#007bff",
                    gap: "5px",
                  }}
                >
                  {" "}
                  Your Privacy Choices
                </Link>
              </Box>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}
