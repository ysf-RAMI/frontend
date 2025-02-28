import React from "react";
import { Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import { Element } from "react-scroll";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Element name="footer">
      <div
        style={{
          backgroundColor: "#01162e",
          color: "#ffffff",
          padding: "40px 0",
          marginTop: "auto",
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                À Propos de Doctor h1
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Doctor h1 est une plateforme éducative dédiée à l'apprentissage
                de l'informatique et des technologies de l'information. Nous
                offrons des cours modernes et interactifs pour vous aider à
                exceller.
              </Typography>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Liens Rapides
              </Typography>
              <Link
                href="/about"
                color="inherit"
                underline="hover"
                display="block"
              >
                À Propos
              </Link>
              <Link
                href="/courses"
                color="inherit"
                underline="hover"
                display="block"
              >
                Cours
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="hover"
                display="block"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                color="inherit"
                underline="hover"
                display="block"
              >
                Politique de Confidentialité
              </Link>
            </Grid>

            {/* Social Media Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Suivez-Nous
              </Typography>
              <Box>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  color="inherit"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  color="inherit"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  color="inherit"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  color="inherit"
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright Section */}
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            © {new Date().getFullYear()} Doctor h1. Tous droits réservés.
          </Typography>
        </Container>
      </div>
    </Element>
  );
};

export default Footer;
