import { Container, Row, Col } from "react-bootstrap";
import { FaResearchgate } from "react-icons/fa";
import { motion } from "framer-motion";
import hamoutimage from "../../assets/hamoutpic.jpg";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { IconButton } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";

export default function HeroSection() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const email = "h.hamout@uiz.ac.ma";
  const researchGate = "https://www.researchgate.net/profile/Hamza-Hamout";

  return (
    <section className="hero-section" style={{ userSelect: "none" }}>
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
                  color: "rgba(1, 1, 1, 0.32)",
                }}
              >
                <h1>Dr. Hamza HAMOUT</h1>
                <h3>Maître de Conférences Habilité</h3>
                <p>École Supérieure de Technologie . Guelmim</p>
                <div className="social-icons" style={{ marginTop: "-10px" }}>
                  <IconButton
                    size="large"
                    style={{ color: "#9CA3AF" }}
                    onClick={() => {
                      window.open(researchGate, "_blank");
                    }}
                  >
                    <FaResearchgate
                      style={{ fontSize: "20px", color: "#6B7280" }}
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    style={{ color: "#9CA3AF" }}
                    onClick={() => {
                      window.open(
                        `https://mail.google.com/mail/?view=cm&to=${email}`,
                        "_blank"
                      );
                    }}
                  >
                    <EmailIcon style={{ fontSize: "20px", color: "#6B7280" }} />
                  </IconButton>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
