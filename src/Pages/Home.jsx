import React from "react";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLaptopCode,
  faChalkboardTeacher,
  faUsers,
  faStar,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { Element, scroller } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";

AOS.init();

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClick() {
    navigate("/filiere");
    toast.success("Redirection vers la page des filières!");
  }

  const scrollToSection = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50, // Adjust offset if needed
    });
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="home-container">
      <ToastContainer />
      {/* Hero Section */}
      <Element name="hero">
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" component="h1" className="hero-title">
              Bienvenue sur Tadrissia
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="hero-description"
            >
              Votre plateforme éducative pour l'informatique et les technologies
              de l'information. Apprenez, innovez et excellez avec nos cours
              modernes et interactifs.
            </Typography>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Button
                onClick={handleClick}
                variant="outline-info"
                size="lg"
                className="hero-button"
                style={{ padding: 12, margin: 12 }}
              >
                Commencer l'Apprentissage
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Element>

      {/* Features Section */}
      <Element name="features">
        <Container className="features-section">
          <Typography variant="h2" component="h2" className="section-title">
            Pourquoi choisir Tadrissia ?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="100"
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
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="200"
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
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="300"
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
      </Element>

      {/* Testimonials Section */}
      <Element name="testimonials">
        <Container className="testimonials-section">
          <Typography variant="h2" component="h2" className="section-title">
            Témoignages
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <CardContent>
                  <Typography variant="body1">
                    "Tadrissia m'a permis de maîtriser des compétences
                    essentielles en un temps record. Je recommande !"
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    <strong>- Ahmed, Étudiant en IA</strong>
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardContent>
                  <Typography variant="body1">
                    "Une plateforme intuitive avec des ressources de qualité.
                    Parfait pour les débutants et les experts."
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    <strong>- Fatima, Développeuse Web</strong>
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Element>

      {/* Call-to-Action Section */}
      <Element name="cta">
        <Container className="cta-section">
          <Typography variant="h2" component="h2" className="section-title">
            Prêt à commencer votre voyage ?
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              onClick={handleClick}
              variant="primary"
              size="lg"
              className="cta-button"
            >
              Rejoignez-nous dès maintenant
            </Button>
          </motion.div>
        </Container>
      </Element>

      {/* Additional Section - About Us */}
      <Element name="about">
        <Container className="about-section">
          <Typography variant="h2" component="h2" className="section-title">
            À propos de Nous
          </Typography>
          <Typography variant="body1" className="about-description">
            Tadrissia est une plateforme éducative dédiée à l'apprentissage de
            l'informatique et des technologies de l'information. Nous offrons
            une gamme de cours modernes et interactifs pour vous aider à
            développer vos compétences dans divers domaines.
          </Typography>
        </Container>
      </Element>

      {/* Additional Section - Why Choose Us */}
      <Element name="why-choose-us">
        <Container className="why-choose-us-section">
          <Typography variant="h2" component="h2" className="section-title">
            Pourquoi Nous Choisir ?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <FontAwesomeIcon
                      icon={faUsers}
                      size="2x"
                      style={{ marginRight: "10px", color: "#01162e" }}
                    />
                    <Typography variant="h5">Communauté Engagée</Typography>
                  </Box>
                  <Typography variant="body1">
                    Une communauté active et supportive pour vous aider tout au
                    long de votre parcours.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <FontAwesomeIcon
                      icon={faStar}
                      size="2x"
                      style={{ marginRight: "10px", color: "#01162e" }}
                    />
                    <Typography variant="h5">Évaluation Continue</Typography>
                  </Box>
                  <Typography variant="body1">
                    Des évaluations régulières pour suivre votre progression et
                    ajuster votre apprentissage.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                className="feature-card"
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
                    <Typography variant="h5">Projets Réels</Typography>
                  </Box>
                  <Typography variant="body1">
                    Des projets réels pour appliquer ce que vous avez appris et
                    construire votre portfolio.
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Element>

      {/* Video Section */}
      <Element name="video">
        <Container className="video-section">
          <Typography variant="h2" component="h2" className="section-title">
            Découvrez Tadrissia en Vidéo
          </Typography>
          <YouTube videoId="dQw4w9WgXcQ" opts={opts} />
        </Container>
      </Element>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h6">
                Liens Utiles
              </Typography>
              <Typography variant="body2" component="p">
                <a href="/privacy-policy" className="footer-link">
                  Politique de Confidentialité
                </a>
              </Typography>
              <Typography variant="body2" component="p">
                <a href="/terms-of-service" className="footer-link">
                  Conditions d'Utilisation
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h6">
                Suivez-nous
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="lg"
                  style={{ marginRight: "10px", color: "#01162e" }}
                />
                <Typography variant="body2" component="p">
                  <a
                    href="https://facebook.com/tadrissia"
                    className="footer-link"
                  >
                    Facebook
                  </a>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="lg"
                  style={{ marginRight: "10px", color: "#01162e" }}
                />
                <Typography variant="body2" component="p">
                  <a
                    href="https://twitter.com/tadrissia"
                    className="footer-link"
                  >
                    Twitter
                  </a>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="lg"
                  style={{ marginRight: "10px", color: "#01162e" }}
                />
                <Typography variant="body2" component="p">
                  <a
                    href="https://instagram.com/tadrissia"
                    className="footer-link"
                  >
                    Instagram
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h6" component="h6">
                Contactez-nous
              </Typography>
              <Typography variant="body2" component="p">
                Email: contact@tadrissia.com
              </Typography>
              <Typography variant="body2" component="p">
                Téléphone: +123 456 7890
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};
