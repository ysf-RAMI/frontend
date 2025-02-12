import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export const Home = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/filiere");
  }

  return (
    <>
      <div
        style={{
          marginBottom: "30px",
          backgroundColor: "#f1f1f1",
          userSelect: "none",
        }}
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
            <h1 style={{ userSelect: "none" }}>
              Ecole Supérieure de Technologie Guelmim
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Button onClick={handleClick} variant="danger" size="lg">
                Choisir votre filière
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
