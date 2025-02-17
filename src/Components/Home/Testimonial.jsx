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
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Testimonial() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Element name="testimonials">
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <Container className="pt-5 pb-3 text-center">
          <Typography
            variant="h6"
            color="primary"
            sx={{ letterSpacing: 2, textTransform: "uppercase", mb: 1 }}
            data-aos="fade-up"
          >
            Témoignages
          </Typography>
          <Typography
            variant="h4"
            sx={{ mb: 4 }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Ce Que Disent Nos Étudiants
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
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
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "Tadrissia m'a permis de maîtriser des compétences
                    essentielles en un temps record. Je recommande !"
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    - Ahmed, Étudiant en IA
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    "Une plateforme intuitive avec des ressources de qualité.
                    Parfait pour les débutants et les experts."
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ fontWeight: "bold" }}
                  >
                    - Fatima, Développeuse Web
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
