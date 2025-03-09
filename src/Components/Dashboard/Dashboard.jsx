import { useEffect, useState } from "react";
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
  School,
  MenuBook,
  Announcement,
  Category,
  Book,
  People,
  Assignment,
  LocalLibrary,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

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

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const response = await axios.get(
          `${baseUrl}/api/admin/dashboardAdmin`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        setDashboardData({
          nbrProfesseur: 0,
          nbrFiliere: 0,
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
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#003366",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  if (error && !dashboardData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#003366",
          color: "white",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  const resourcesPieData = [
    {
      id: 0,
      value: dashboardData.nbrCours,
      label: "Courses",
      color: "#4caf50",
    },
    { id: 1, value: dashboardData.nbrTd, label: "TD", color: "#2196f3" },
    { id: 2, value: dashboardData.nbrTp, label: "TP", color: "#ff9800" },
    { id: 3, value: dashboardData.nbrExam, label: "Exams", color: "#f44336" },
  ].filter((item) => item.value > 0);

  const filesPieData = [
    {
      id: 0,
      value: dashboardData.nbrFichier,
      label: "Files",
      color: "#9c27b0",
    },
    { id: 1, value: dashboardData.nbrVideo, label: "Videos", color: "#009688" },
  ].filter((item) => item.value > 0);

  const statsCards = [
    {
      title: "Professors",
      value: dashboardData.nbrProfesseur,
      icon: <People />,
      bgColor: "#003366",
      textColor: "white",
    },
    {
      title: "Filières",
      value: dashboardData.nbrFiliere,
      icon: <Category />,
      bgColor: "#01162e",
      textColor: "white",
    },
    {
      title: "Modules",
      value: dashboardData.nbrModule,
      icon: <MenuBook />,
      bgColor: "#003366",
      textColor: "white",
    },
    {
      title: "Announcements",
      value: dashboardData.nbrAnnonce,
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
            <Typography variant="h4" component="h1" fontWeight="bold">
              School Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
              Manage your educational platform effectively
            </Typography>
          </Box>

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

          <Row className="mb-4">
            <Col xs={12}>
              <Card data-aos="fade-up">
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ mb: 3, color: "#003366", fontWeight: "bold" }}
                  >
                    Resources Overview
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
                          <Typography variant="h6">Total Resources</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ mb: 2 }}>
                          {dashboardData.nbrResources}
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
                              <Typography variant="body2">Files</Typography>
                              <Typography variant="h6">
                                {dashboardData.nbrFichier}
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
                              <Typography variant="body2">Videos</Typography>
                              <Typography variant="h6">
                                {dashboardData.nbrVideo}
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
                          Educational Content
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
                                {dashboardData.nbrCours}
                              </Typography>
                              <Typography variant="body1">Courses</Typography>
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
                                {dashboardData.nbrTd}
                              </Typography>
                              <Typography variant="body1">TDs</Typography>
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
                                {dashboardData.nbrTp}
                              </Typography>
                              <Typography variant="body1">TPs</Typography>
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
                                {dashboardData.nbrExam}
                              </Typography>
                              <Typography variant="body1">Exams</Typography>
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

          <Row className="mb-4">
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
                    Educational Content
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                  </Box>
                </CardContent>
              </Card>
            </Col>

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
                    File Type
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                          colorScale: "category10",
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
                  </Box>
                </CardContent>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card data-aos="fade-up" data-aos-delay="300">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#003366", fontWeight: "bold" }}
                  >
                    Resource Overview
                  </Typography>
                  <Box sx={{ height: 400, mt: 4 }}>
                    <BarChart
                      xAxis={[
                        {
                          id: "barCategories",
                          data: [
                            "Professors",
                            "Filières",
                            "Modules",
                            "Announcements",
                            "Resources",
                          ],
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: [
                            dashboardData.nbrProfesseur,
                            dashboardData.nbrFiliere,
                            dashboardData.nbrModule,
                            dashboardData.nbrAnnonce,
                            dashboardData.nbrResources,
                          ],
                          color: "#003366",
                          label: "Count",
                          borderRadius: 8,
                        },
                      ]}
                      height={430}
                      margin={{ top: 40, right: 10, bottom: 40, left: 40 }}
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
};

export default Dashboard;
