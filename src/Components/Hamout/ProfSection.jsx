import { useEffect } from "react"; 
import { motion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom"; 
import hamoutimage from "../../assets/hamoutpic.jpg"; 
import { Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css"; 

const ProfSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <section className="hero-section" style={{ backgroundColor: "#f1f4f6" }}>
      <Container>
        <Row className="align-items-center">
          <Col
            md={6}
            className="text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.img
              src={hamoutimage}
              alt="Dr. Hamza HAMOUT"
              className="profile-image"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "10%",
                border: "2px solid white",
                boxShadow: "0 0 110px rgba(70, 31, 31, 0.21)",
                cursor: "pointer",
              }}
              data-aos="fade-right"
              data-aos-delay="200"
            />
          </Col>

          <Col md={6}>
            <motion.div data-aos="fade-left" data-aos-delay="400">
              <div
                className="social-icons"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1>Dr. Hamza HAMOUT</h1>
                <h4 style={{ padding: "3px" }}>
                  Maître de Conférences Habilité
                </h4>

                <p>
                  Hamza Hamout a obtenu une licence en mathématiques et sciences
                  informatiques de l'Université Ibn Zohr d'Agadir, Agadir,
                  Maroc, en 2014, un master en réseaux et systèmes intelligents
                  de l'Université Sidi Mohamed Ben Abdellah de Fès, Fès, Maroc,
                  en 2016, et un doctorat en informatique de l'Université Ibn
                  Zohr d'Agadir, Agadir, Maroc, en 2020. Ses intérêts de
                  recherche actuels portent sur le codage d'images et de vidéos
                  ainsi que sur les extensions du codage vidéo à haute
                  efficacité.
                </p>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => navigate("/hamout")}
                >
                  Voir plus
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};


export default ProfSection;