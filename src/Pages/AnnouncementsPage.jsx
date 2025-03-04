import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  CardMedia,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Footer from "../Components/Footer";
import defaultImage from "../assets/annonceDefaultImage.jpg";

const AnnouncementsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const baseUrl = "http://localhost:8080";

  // Fetch announcements
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/student/getAllAnnoces`)
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter announcements based on search term
  const filterAnnouncements = () => {
    if (!searchTerm) return announcements; // Return all announcements if search term is empty
    return announcements.filter((announcement) => {
      const matchesSearch =
        announcement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  return (
    <>
      <Box sx={{ py: 8, bgcolor: "background.default", mt: 3 }}>
        <Container maxWidth="xl">
          <Row className="mb-5">
            <Col>
              <Typography
                variant="h2"
                align="center"
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
                sx={{ mb: 6 }}
              >
                Consultez toutes nos annonces
              </Typography>
            </Col>
          </Row>

          {/* Search Bar */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
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

          {/* Announcements Grid */}
          <Grid container spacing={4}>
            {filterAnnouncements().map((announcement, index) => (
              <Grid item xs={12} sm={6} md={4} key={announcement.id}>
                <Card
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
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      announcement.imageUrl
                        ? `${baseUrl}${announcement.imageUrl}`
                        : defaultImage
                    }
                    alt={announcement.titre}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
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
                      {announcement.titre}
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
                        alt={`${announcement.nomProfesseur} ${announcement.prenomProfesseur}`}
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
                          {`${announcement.nomProfesseur} ${announcement.prenomProfesseur}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Professeur
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* No Announcements Found */}
          {filterAnnouncements().length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Aucune annonce trouvée
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AnnouncementsPage;
