import { Element } from "react-scroll";
import { Container, Row, Col } from "react-bootstrap";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faGraduationCap,
  faBook,
  faChalkboardTeacher,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const features = [
  {
    id: 1,
    icon: faBullhorn,
    title: "Annonces Importantes",
    description:
      "Restez informé des dernières annonces et mises à jour concernant votre formation.",
  },
  {
    id: 2,
    icon: faGraduationCap,
    title: "Filières Diversifiées",
    description:
      "Une large sélection de filières adaptées aux besoins des étudiants . ",
  },
  {
    id: 3,
    icon: faBook,
    title: "Modules Structurés",
    description:
      "Des modules bien organisés pour une progression fluide et efficace dans votre apprentissage.",
  },
  {
    id: 4,
    icon: faChalkboardTeacher,
    title: "Professeurs Qualifiés",
    description:
      "Apprenez avec des enseignants expérimentés qui vous guideront à chaque étape.",
  },
  {
    id: 5,
    icon: faFileAlt,
    title: "Ressources Complètes",
    description:
      "Accédez à des supports de cours, exercices, examens et vidéos pour approfondir vos connaissances.",
  },
];

export default function WhyUs() {
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
            Pourquoi choisir Doctor H1 ?
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
                        size="1x"
                        style={{ marginRight: "10px", color: "rgb(0, 26, 156)" }}
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
