import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  InputAdornment,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const announcements = [
    {
      id: 1,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
    {
      id: 2,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
    {
      id: 3,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
    {
      id: 4,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
    {
      id: 5,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
    {
      id: 6,
      title: "cors de soire",
      description: "descrption annonce",
      professor: {
        name: "Dr. hemza hamout",
        avatar: "/api/placeholder/50/50",
        department: "genie informatique",
      },
      date: "2024-02-20",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filterAnnouncements = () => {
    return announcements.filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        announcement.professor.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default",mt:3 }}>
      <Container maxWidth="xl">
        <Row className="mb-5">
          <Col>
            <Typography
              variant="h2"
              align="center"
              data-aos="fade-up"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Annonces
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              data-aos="fade-up"
              data-aos-delay="100"
              sx={{ mb: 6 }}
            >
              Consultez toutes nos annonces
            </Typography>
          </Col>
        </Row>

        <Box
          sx={{
            mb: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
          data-aos="fade-up"
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Rechercher des annonces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          {filterAnnouncements().map((announcement, index) => (
            <Grid item xs={12} md={6} lg={4} key={announcement.id}>
              <Card
                data-aos="fade-up"
                data-aos-delay={index * 100}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                      <Typography variant="caption">
                        {formatDate(announcement.date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.25rem",
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
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
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
                    onClick={() => navigate(`/announcement/${announcement.id}`)}
                    sx={{
                      mt: "auto",
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1.5,
                    }}
                  >
                    Voir plus
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filterAnnouncements().length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
            data-aos="fade-up"
          >
            <Typography variant="h6" color="text.secondary">
              Aucune annonce trouvée
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AnnouncementsPage;
