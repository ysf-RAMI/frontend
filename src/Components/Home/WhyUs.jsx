import { Element } from "react-scroll";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStar,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Scale } from "@mui/icons-material";

const features = [
  {
    id: 1,
    icon: faUsers,
    title: "Communauté Engagée",
    description:
      "Une communauté active et supportive pour vous aider tout au long de votre parcours.",
  },
  {
    id: 2,
    icon: faStar,
    title: "Évaluation Continue",
    description:
      "Des évaluations régulières pour suivre votre progression et ajuster votre apprentissage.",
  },
  {
    id: 3,
    icon: faLaptopCode,
    title: "Projets Réels",
    description:
      "Des projets réels pour appliquer ce que vous avez appris et construire votre portfolio.",
  },
];

export default function WhyUs() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <Element name="why-choose-us">
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
            Pourquoi Nous Choisir ?
          </Typography>
          <Typography
            variant="h4"
            sx={{ mb: 4 }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Nos Avantages
          </Typography>
          <Row className="justify-content-center">
            {features.map((feature, index) => (
              <Col
                key={feature.id}
                xs={12}
                sm={6}
                md={4}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <Card
                  elevation={3}
                  className="h-100 p-3"
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    boxShadow: 3,
                    userSelect: "none",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                      "& .card-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={2}
                    >
                      <FontAwesomeIcon
                        icon={feature.icon}
                        size="2x"
                        style={{ marginRight: "10px", color: "#01162e" }}
                      />
                      <Typography variant="h6">{feature.title}</Typography>
                    </Box>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Element>
  );
}
