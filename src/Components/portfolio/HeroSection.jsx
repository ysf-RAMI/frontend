import { Container, Row, Col } from "react-bootstrap";
import { FaGoogle, FaLinkedin, FaResearchgate } from "react-icons/fa";
import { motion } from "framer-motion";
import hamoutimage from "../../assets/hamoutpic.jpg";
import { useEffect } from "react";
import Aos from "aos";

export default function HeroSection() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="hero-section">
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="social-icons"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    textShadow: "0 1px 6px black",
                  }}
                >
                  Dr. Hamza HAMOUT
                </h1>
                <h3
                  style={{
                    textShadow: "0 1px 6px black",
                  }}
                >
                  Maître de Conférences Habilité
                </h3>
                <p
                  style={{
                    textShadow: "0 1px 6px black",
                  }}
                >
                  École Supérieure de Technologie Guelmim
                </p>
                <div className="social-icons" style={{ marginTop: "-10px" }}>
                  <motion.a
                    href="#"
                    className="social-icon"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="social-icon"
                    whileHover={{
                      scale: 1.1,
                    }}
                  >
                    <FaResearchgate />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="social-icon"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaGoogle />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
