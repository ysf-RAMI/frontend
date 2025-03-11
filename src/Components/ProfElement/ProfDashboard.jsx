import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
  Grid,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import {
  MenuBook,
  Announcement,
  VideoLibrary,
  Book,
  Assignment,
  LocalLibrary,
  School,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

// Thème personnalisé avec les couleurs spécifiées
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
      dark: "#01162e",
      light: "#1a4d85",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#003366",
      secondary: "#01162e",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default function ProfDashboard() {
  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const profId = localStorage.getItem("profId");

  const [stats, setStats] = useState({
    nbrModule: 0,
    nbrAnnonce: 0,
    nbrResources: 0,
    nbrTd: 0,
    nbrTp: 0,
    nbrCours: 0,
    nbrExam: 0,
    nbrFichier: 0,
    nbrVideo: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [professorInfo, setProfessorInfo] = useState({
    name: "Professeur",
    department: "Département",
    email: "email@example.com",
  });

  useEffect(() => {
    // Initialiser la bibliothèque d'animation AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    // Récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/professeur/getDashboard/${profId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(response.data);
        setLoading(false);
      } catch (err) {
        toast.er(
          "Erreur lors de la récupération des données du tableau de bord:",
          err
        );
        setError(
          "Impossible de charger les données. Veuillez réessayer plus tard."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, profId, token]);

  // Si chargement en cours, afficher un spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#003366" }} />
      </Box>
    );
  }

  // Si une erreur s'est produite, afficher un message d'erreur
  if (error) {
    return (
      <>
      <ToastContainer
              autoClose={2500}
              hideProgressBar={false}
              closeOnClick={true}
              newestOnTop={true}
              closeButton={false}
              enableMultiContainer={true}
              position="top-center"
              zIndex={9999}
            />
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",

            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{error}</Typography>
        </Box>
      </>
    );
  }

  // Préparer les données pour les graphiques
  const resourcesPieData = [
    { id: 0, value: stats.nbrCours, label: "Cours", color: "#4caf50" },
    { id: 1, value: stats.nbrTd, label: "TD", color: "#2196f3" },
    { id: 2, value: stats.nbrTp, label: "TP", color: "#ff9800" },
    { id: 3, value: stats.nbrExam, label: "Examens", color: "#f44336" },
  ].filter((item) => item.value > 0);

  const filesPieData = [
    { id: 0, value: stats.nbrFichier, label: "Fichiers", color: "#9c27b0" },
    { id: 1, value: stats.nbrVideo, label: "Vidéos", color: "#009688" },
  ].filter((item) => item.value > 0);

  // Données des cartes statistiques
  const statsCards = [
    {
      title: "Modules",
      value: stats.nbrModule,
      icon: <MenuBook />,
      bgColor: "#003366",
      textColor: "white",
    },
    {
      title: "Ressources",
      value: stats.nbrResources,
      icon: <Assignment />,
      bgColor: "#01162e",
      textColor: "white",
    },
    {
      title: "Cours",
      value: stats.nbrCours,
      icon: <School />,
      bgColor: "#003366",
      textColor: "white",
    },
    {
      title: "Annonces",
      value: stats.nbrAnnonce,
      icon: <Announcement />,
      bgColor: "#01162e",
      textColor: "white",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
              autoClose={2500}
              hideProgressBar={false}
              closeOnClick={true}
              newestOnTop={true}
              closeButton={false}
              enableMultiContainer={true}
              position="top-center"
              zIndex={9999}
            />
      <Box sx={{ bgcolor: "#f5f9fc", minHeight: "100vh", pt: 3, pb: 6 }}>
        <Container fluid>
          {/* En-tête avec profil du professeur */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 2,
              bgcolor: "#003366",
              color: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
            data-aos="fade-down"
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "rgba(255,255,255,0.2)",
                    border: "2px solid white",
                  }}
                >
                  {professorInfo.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Tableau de Bord Professeur
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
                  Bienvenue, {professorInfo.name}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Cartes statistiques */}
          <Row className="mb-4">
            {statsCards.map((stat, index) => (
              <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                <Card
                  sx={{
                    bgcolor: stat.bgColor,
                    color: stat.textColor,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                          mr: 2,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Typography variant="h6">{stat.title}</Typography>
                    </Box>
                    <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Aperçu des ressources */}
          <Row className="mb-4">
            <Col xs={12}>
              <Card data-aos="fade-up">
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ mb: 3, color: "#003366", fontWeight: "bold" }}
                  >
                    Aperçu des Ressources Pédagogiques
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: "#003366",
                          color: "white",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <LocalLibrary sx={{ mr: 1 }} />
                          <Typography variant="h6">Total Ressources</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ mb: 2 }}>
                          {stats.nbrResources}
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                p: 1,
                                bgcolor: "rgba(255,255,255,0.1)",
                                borderRadius: 1,
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="body2">Fichiers</Typography>
                              <Typography variant="h6">
                                {stats.nbrFichier}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                p: 1,
                                bgcolor: "rgba(255,255,255,0.1)",
                                borderRadius: 1,
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="body2">Vidéos</Typography>
                              <Typography variant="h6">
                                {stats.nbrVideo}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={9}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: "white",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ mb: 2, color: "#003366" }}
                        >
                          Contenu Éducatif
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3}>
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: "#E3F2FD",
                                color: "#003366",
                                borderRadius: 2,
                                textAlign: "center",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Book sx={{ fontSize: 36, mb: 1 }} />
                              <Typography variant="h4">
                                {stats.nbrCours}
                              </Typography>
                              <Typography variant="body1">Cours</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: "#E8F5E9",
                                color: "#003366",
                                borderRadius: 2,
                                textAlign: "center",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Assignment sx={{ fontSize: 36, mb: 1 }} />
                              <Typography variant="h4">
                                {stats.nbrTd}
                              </Typography>
                              <Typography variant="body1">TD</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: "#FFF3E0",
                                color: "#003366",
                                borderRadius: 2,
                                textAlign: "center",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <School sx={{ fontSize: 36, mb: 1 }} />
                              <Typography variant="h4">
                                {stats.nbrTp}
                              </Typography>
                              <Typography variant="body1">TP</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: "#FFEBEE",
                                color: "#003366",
                                borderRadius: 2,
                                textAlign: "center",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <MenuBook sx={{ fontSize: 36, mb: 1 }} />
                              <Typography variant="h4">
                                {stats.nbrExam}
                              </Typography>
                              <Typography variant="body1">Examens</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Col>
          </Row>

          {/* Graphiques */}
          <Row className="mb-4">
            {/* Distribution des ressources */}
            <Col xs={12} md={6} className="mb-4">
              <Card
                sx={{ height: "100%" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
                    Distribution du Contenu Éducatif
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {resourcesPieData.length > 0 ? (
                      <PieChart
                        series={[
                          {
                            data: resourcesPieData,
                            innerRadius: 50,
                            outerRadius: 120,
                            paddingAngle: 2,
                            cornerRadius: 8,
                            startAngle: -90,
                            endAngle: 270,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        width={350}
                        height={300}
                        slotProps={{
                          legend: {
                            direction: "column",
                            position: {
                              vertical: "middle",
                              horizontal: "right",
                            },
                            padding: 0,
                          },
                        }}
                      />
                    ) : (
                      <Box sx={{ textAlign: "center", p: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Aucune donnée de contenu éducatif disponible
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Col>

            {/* Distribution des types de fichiers */}
            <Col xs={12} md={6} className="mb-4">
              <Card
                sx={{ height: "100%" }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
                    Distribution des Types de Fichiers
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {filesPieData.length > 0 ? (
                      <PieChart
                        series={[
                          {
                            data: filesPieData,
                            innerRadius: 50,
                            outerRadius: 120,
                            paddingAngle: 2,
                            cornerRadius: 8,
                            startAngle: -90,
                            endAngle: 270,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        width={350}
                        height={300}
                        slotProps={{
                          legend: {
                            direction: "column",
                            position: {
                              vertical: "middle",
                              horizontal: "right",
                            },
                            padding: 0,
                          },
                        }}
                      />
                    ) : (
                      <Box sx={{ textAlign: "center", p: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Aucune donnée de type de fichier disponible
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Col>
          </Row>

          {/* Graphique en barres - Aperçu des ressources */}
          <Row>
            <Col xs={12}>
              <Card data-aos="fade-up" data-aos-delay="300">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
                    Aperçu du Matériel Pédagogique
                  </Typography>
                  <Box sx={{ height: 400, mt: 4 }}>
                    <BarChart
                      xAxis={[
                        {
                          id: "barCategories",
                          data: [
                            "Modules",
                            "Cours",
                            "TD",
                            "TP",
                            "Examens",
                            "Fichiers",
                            "Vidéos",
                          ],
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: [
                            stats.nbrModule,
                            stats.nbrCours,
                            stats.nbrTd,
                            stats.nbrTp,
                            stats.nbrExam,
                            stats.nbrFichier,
                            stats.nbrVideo,
                          ],
                          color: "#003366",
                          label: "Nombre",
                          borderRadius: 8,
                        },
                      ]}
                      height={350}
                      margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                      slotProps={{
                        bar: {
                          style: {
                            fill: "#003366",
                            opacity: 0.9,
                            stroke: "#01162e",
                            strokeWidth: 1,
                          },
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
