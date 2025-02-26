import React from "react";
import Slider from "react-slick";
import { Box, Container, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        right: isMobile ? "10px" : "30px",
        position: "absolute", // Ensure proper positioning
        top: isMobile ? "40%" : "50%", // Vertically center the arrow
        transform: "translateY(-50%)", // Adjust for centering
        zIndex: 2,
        padding: isMobile ? "6px" : "10px",
        cursor: 'pointer',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClick}
    >
    </div>
  );
};

// Custom Prev Arrow
export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        position: "absolute", // Ensure proper positioning
        left:  isMobile ? "10px" : "30px",// Stay within the image
        top: isMobile ? "40%" : "50%", // Vertically center the arrow
        transform: "translateY(-50%)", // Adjust for centering
        zIndex: 2,
        padding: isMobile ? "6px" : "10px",
        cursor: 'pointer', backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClick}
    >
      {/* <ArrowBackIcon sx={{ color: '#fff' }} /> */}
    </div>
  );
};

export default function ImageCarousel() {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,  // Now passing the component as a JSX element
        prevArrow: <PrevArrow />,  // Now passing the component as a JSX element
      };


      const slides = [
        {
          id: 1,
          imageUrl: "/images/slide1.avif",
          alt: "Slide 1",
          caption: "Look good, feel good. Supplements for head-to-tail health.",
        },
        {
          id: 2,
          imageUrl: "/images/slide2.avif",
          alt: "Slide 2",
          caption: "Vibeful by Chewy - 10-in-1 Multivitamin Soft Chews for Dogs.",
        },
        {
          id: 3,
          imageUrl: "/images/slide3.avif",
          alt: "Slide 3",
          caption: "Mobility & Joint Support Chews for Pets.",
        },
        {
          id: 4,
          imageUrl: "/images/slide4.avif",
          alt: "Slide 4",
          caption: "Keep your pet's coat shiny with our grooming kits.",
        },
        {
          id: 5,
          imageUrl: "/images/slide5.avif",
          alt: "Slide 5",
          caption: "New arrivals! Trendy accessories for your pets.",
        },
        {
          id: 6,
          imageUrl: "/images/slide6.avif",
          alt: "Slide 6",
          caption: "Special discounts on all pet food this week!",
        },
      ];

      return (
        <Container maxWidth= "xl" disableGutters = "true">
         <Box sx={{ backgroundColor: "#f5f5f5", py: 0.5 }}>
                <div className="carousel-container" style={{ Width: "100%", margin: "0 auto" }}>
                  <Slider {...settings}>
                    {slides.map((slide) => (
                      <div key={slide.id}>
                        <img
                          src={slide.imageUrl}
                          alt={slide.alt}
                          // width={1200}
                          // height={400}
                          layout="responsive"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            maxWidth: "95%",
                            margin: "0 auto",
                          }}
                        />
                        <Typography
                          sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold', fontSize: '16px' }}
                        >
                          {slide.caption}
                        </Typography>
                      </div>
                    ))}
                  </Slider>
                </div>
              </Box>
              </Container>
      )
}