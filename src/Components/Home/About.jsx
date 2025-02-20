import { Element } from "react-scroll";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function About() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Element name="about">
      <div className="py-5 bg-light">
        <Container className="pt-5 pb-3 text-center">
          <Typography
            variant="h6"
            color="primary"
            sx={{
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1,
              fontFamily: "Work Sans",
              fontWeight: 400,
            }}
            data-aos="fade-up"
          >
            À propos de Nous
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontFamily: "Work Sans",
              fontWeight: 500,
            }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Découvrez Tadrissia
          </Typography>
          <Row>
            <Col md={12} lg={8} className="mx-auto">
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#f8f9fa",
                  boxShadow: 3,
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="body1"
                    className="about-description"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      fontFamily: "Work Sans",
                      fontWeight: 400,
                    }}
                  >
                    Tadrissia est une plateforme éducative dédiée à
                    l'apprentissage de l'informatique et des technologies de
                    l'information. Nous offrons une gamme de cours modernes et
                    interactifs pour vous aider à développer vos compétences
                    dans divers domaines.
                  </Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Element>
  );
}
