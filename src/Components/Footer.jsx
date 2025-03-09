import React from "react";
import { Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram, Email } from "@mui/icons-material";
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
                Doctor H1 est une plateforme éducative dédiée à l'apprentissage.
                Nous proposons des cours modernes, adaptés à vos besoins
                spécifiques pour vous aider à exceller.
              </Typography>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Liens Rapides
              </Typography>
              <Link href="/" color="inherit" underline="hover" display="block">
                Home
              </Link>
              <Link
                href="/filiere"
                color="inherit"
                underline="hover"
                display="block"
              >
                Filières
              </Link>
              <Link
                href="/annonce"
                color="inherit"
                underline="hover"
                display="block"
              >
                Annonces
              </Link>
            </Grid>

            {/* Social Media Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Box>
                <IconButton
                  href="https://www.linkedin.com/in/youssef-rami/"
                  target="_blank"
                  color="inherit"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open(
                      "https://mail.google.com/mail/?view=cm&to=yousseframi012@gmail.com",
                      "_blank"
                    )
                  }
                  color="inherit"
                >
                  <Email />
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
            © {new Date().getFullYear()} Doctor H1. Tous droits réservés.
          </Typography>
        </Container>
      </div>
    </Element>
  );
};

export default Footer;
