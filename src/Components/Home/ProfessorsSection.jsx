import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AOS from "aos";
import "aos/dist/aos.css";
// Import the image properly
import TeamImg from "../../assets/54c27441-ad21-4af6-bd47-43568a499f29.png";

const ProfessorsSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const professors = [
    {
      id: 1,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 2,
      name: "dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
    {
      id: 3,
      name: "Dr. hamza hamout",
      specialization: "Genie Informatique",
    },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 304; // card width + padding
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
    const maxScroll = container.scrollWidth - container.clientWidth;

    let newScrollPosition =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    // If we're scrolling right and reach the end, stay at end
    if (direction === "right") {
      newScrollPosition = Math.min(newScrollPosition, maxScroll);
    }
    // If we're scrolling left and reach the start, stay at start
    if (direction === "left") {
      newScrollPosition = Math.max(newScrollPosition, 0);
    }

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  const handleProfessorClick = (profId) => {
    navigate(`/professor/${profId}`);
  };

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          data-aos="fade-up"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: "bold",
            mb: 6,
          }}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Professors
        </Typography>

        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: { xs: "10px", md: "40px" },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: 2,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: { xs: "10px", md: "40px" },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: 2,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "hidden",
            gap: 3,
            px: 2,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {professors.map((professor, index) => (
            <Box
              key={professor.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              sx={{
                flex: "0 0 280px",
                "&:not(:last-child)": { mr: 3 },
              }}
            >
              <Box
                onClick={() => handleProfessorClick(professor.id)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    "& .overlay": {
                      opacity: 1,
                    },
                    "& img": {
                      filter: "brightness(0.5)",
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={TeamImg}
                  alt={professor.name}
                  sx={{
                    width: "100%",
                    height: 350,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "all 0.3s ease",
                  }}
                />

                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      bgcolor: "background.paper",
                      color: "text.primary",
                      py: 1,
                      px: 3,
                      borderRadius: 8,
                      fontWeight: "bold",
                    }}
                  >
                    See Prof Biography
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {professor.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {professor.specialization}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfessorsSection;
