import { motion } from "framer-motion"; // Import `motion` from framer-motion
import { Col, Container, Row } from "react-bootstrap"; // Import Bootstrap components
import { useNavigate } from "react-router-dom"; // For navigation
import hamoutimage from "../../assets/hamoutimage.jpg"; // Adjust the path to your image
import { Button } from "@mui/material"; // Import MUI Button

export default function HomeSectionProf() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          {/* Image Column - Animates from the left */}
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
              initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
              animate={{ opacity: 1, x: 0 }} // Animate to the center
              transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
            />
          </Col>

          {/* Text Column - Animates from the right */}
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
              animate={{ opacity: 1, x: 0 }} // Animate to the center
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} // Smooth transition with delay
            >
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
                  color="brown"
                  style={{ width: "110px" ,"&hover": { color: "white" ,backgroundColor: "brown"} }}
                  onClick={() => navigate("/hamout")}
                >
                  More
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
