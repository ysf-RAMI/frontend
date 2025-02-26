import  { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import img from "../../assets/54c27441-ad21-4af6-bd47-43568a499f29.png";

const AnnouncementSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Genie informatique",
      description: "description",
      professor: {
        name: "hamza hamout",
        avatar: "/api/placeholder/50/50",
        department: "traitment d'image",
      },
      date: "2024-03-01",
      category: "ma3reftch",
      priority: "high",
    },
    {
      id: 2,
      title: "Genie informatique",
      description: "description",
      professor: {
        name: "hamza hamout",
        avatar: "/api/placeholder/50/50",
        department: "traitment d'image",
      },
      date: "2024-03-01",
      category: "ma3reftch",
      priority: "high",
    },
    {
      id: 3,
      title: "Genie informatique",
      description: "description",
      professor: {
        name: "hamza hamout",
        avatar: "/api/placeholder/50/50",
        department: "traitment d'image",
      },
      date: "2024-03-01",
      category: "ma3reftch",
      priority: "high",
    },
  ];

  const handleAnnouncementClick = (id) => {
    navigate(`/announcement/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 90%)",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl">
        <Row className="mb-5">
          <Col>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
            
              <Typography
                variant="h2"
                align="center"
                data-aos="fade-up"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                }}
              >
               Les announcements
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              data-aos="fade-up"
              data-aos-delay="100"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
             les derniere announcements de Doctor H1 ..!
            </Typography>
          </Col>
        </Row>

        <Grid container spacing={4}>
          {announcements.map((announcement, index) => (
            <Grid item xs={12} md={4} key={announcement.id}>
              <Card
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onMouseEnter={() => setHoveredCard(announcement.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                    "& .card-overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={img}
                  alt={announcement.title}
                  sx={{
                    transition: "transform 0.3s ease",
                    ...(hoveredCard === announcement.id && {
                      transform: "scale(1.05)",
                    }),
                  }}
                />
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 220,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                <CardContent
                  sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={announcement.category}
                      color={
                        announcement.priority === "high" ? "error" : "primary"
                      }
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 500,
                      }}
                    />
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: "auto" }}
                    >
                      <AccessTimeIcon
                        sx={{
                          fontSize: "0.875rem",
                          mr: 0.5,
                          color: "text.secondary",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(announcement.date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      height: "3rem",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {announcement.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      height: "4.5rem",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {announcement.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      src={announcement.professor.avatar}
                      alt={announcement.professor.name}
                      sx={{
                        mr: 2,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {announcement.professor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {announcement.professor.department}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAnnouncementClick(announcement.id)}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: "auto",
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 500,
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
          data-aos="fade-up"
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/announcements")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 500,
              "&:hover": {
                borderWidth: 2,
                background: "rgba(0,0,0,0.02)",
              },
            }}
          >
            View All Announcements
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AnnouncementSection;
