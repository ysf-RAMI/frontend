import { Typography, Button } from "@mui/material";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/filiere");
    toast.success("Redirection vers la page des filières!");
  };

  return (
    <Element name="hero">
      <div
        className="hero-section"
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/path/to/your/hero-image.jpg')", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
        }}
      >
        <div
          className="hero-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text visibility
          }}
        ></div>
        <motion.div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Bienvenue sur Tadrissia
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Votre plateforme éducative pour l'informatique et les technologies
            de l'information. Apprenez, innovez et excellez avec nos cours
            modernes et interactifs.
          </Typography>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Button
              onClick={handleClick}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "transparent",
                color: "#0dcaf0",
                border: "2px solid #0dcaf0",
                "&:hover": {
                  backgroundColor: "#0dcaf0",
                  color: "black",
                  border: "2px solid black",
                },
                padding: "12px 24px",
                fontSize: "1.1rem",
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Commencer l'Apprentissage
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Element>
  );
}
