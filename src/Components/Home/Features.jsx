import React from "react";
import {
  Container,
  Grid,
  Paper,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLaptopCode,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Features() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Element name="features">
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Container className="pt-5 pb-3 text-center">
          <Typography
            variant="h6"
            color="primary"
            sx={{ letterSpacing: 2, textTransform: "uppercase", mb: 1 }}
            data-aos="fade-up"
          >
            Pourquoi choisir Tadrissia ?
          </Typography>
          <Typography
            variant="h4"
            sx={{ mb: 4 }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Nos Avantages
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  boxShadow: 3,
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <FontAwesomeIcon
                      icon={faBook}
                      size="2x"
                      style={{ marginRight: "10px", color: "#01162e" }}
                    />
                    <Typography variant="h5">Cours Modernes</Typography>
                  </Box>
                  <Typography variant="body1">
                    Des cours conçus pour répondre aux besoins actuels du
                    marché.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  boxShadow: 3,
                }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <FontAwesomeIcon
                      icon={faLaptopCode}
                      size="2x"
                      style={{ marginRight: "10px", color: "#01162e" }}
                    />
                    <Typography variant="h5">Exercices Interactifs</Typography>
                  </Box>
                  <Typography variant="body1">
                    Des exercices pratiques et des projets pour renforcer vos
                    compétences.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  boxShadow: 3,
                }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      size="2x"
                      style={{ marginRight: "10px", color: "#01162e" }}
                    />
                    <Typography variant="h5">Support Personnalisé</Typography>
                  </Box>
                  <Typography variant="body1">
                    Accédez à un soutien personnalisé pour maximiser votre
                    apprentissage.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Element>
  );
}
