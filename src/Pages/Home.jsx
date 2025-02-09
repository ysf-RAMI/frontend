import { useContext, useRef, useEffect } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import { moduleContext } from "../Context/ModuleContext";
import NavbarComponent from "../Components/NavbarComponent";

const AnimatedCard = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
};

export const Home = () => {
  const { filiere } = useContext(moduleContext);
  const filiereRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (location.state?.scrollToFiliere && filiereRef.current) {
      filiereRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <>
      <NavbarComponent />
      <div
        style={{ marginBottom: "30px", backgroundColor: "#f1f1f1" }}
        className="home-container"
      >
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Ecole Supérieure de Technologie Guelmim</h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Button
                onClick={() =>
                  filiereRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                variant="danger"
                size="lg"
              >
                Choisir votre filière
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Filière Section */}
        <Container className="text-center" ref={filiereRef}>
          <h1 className="serviceMainTitle">Filières</h1>
          <div className="bottom"></div>
          <Row className="justify-content-center align-items-center">
            {filiere.map((f) => (
              <Col key={f.filiereId} lg={4} md={6} sm={12}>
                <Link
                  to={`/filiere/${f.filiereId}`}
                  className="link-button text-decoration-none"
                >
                  <AnimatedCard>
                    <div className="serviceCard text-center">
                      <h4 className="serviceName">{f.nomFiliere}</h4>
                      <ul style={{ marginTop: "20px" }}>
                        <p
                          style={{
                            color: "black",
                            fontSize: "20px",
                            textAlign: "left",
                          }}
                        >
                          Modules
                        </p>
                        {f.modules.map((m) => (
                          <li key={m.id} style={{ textAlign: "left" }}>
                            {m.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedCard>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
