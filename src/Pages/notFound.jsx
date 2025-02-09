import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";
import notfound40 from "../assets/notfound40.png";
import notfound4 from "../assets/notfound4.png";

export const NotFound = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="notfound-container">
      {/* Hero Section */}
      <div className="notfound-hero-section">
        <div className="notfound-overlay"></div>
        <motion.div
          className="notfound-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="notfound-images">
            <img src={notfound40} className="notfound40" alt="404" />
            <img src={notfound4} className="notfound4" alt="404" />
          </div>
          <h1>Page Not Found</h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Button onClick={handleClick} variant="info" size="lg">
              Go to Home Page
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
