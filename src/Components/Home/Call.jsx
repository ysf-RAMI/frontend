import { Element } from "react-scroll";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Call() {
  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  function handleClick() {
    navigate("/filiere");
    toast.success("Redirection vers la page des filières!");
  }

  return (
    <Element name="cta">
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #01162e 0%, #003366 100%)",
          color: "#ffffff",
        }}
      >

        <ToastContainer
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick={true}
          newestOnTop={true}
          closeButton={false}
          enableMultiContainer={true}
          position="top-center"
          zIndex={9999}
        />
        <Container className="pt-5 pb-3 text-center">
          <Typography
            variant="h6"
            color="primary"
            sx={{
              letterSpacing: 3,
              textTransform: "uppercase",
              mb: 1,
              color: "#ffffff",
            }}
            data-aos="fade-up"
          >
            Prêt à commencer votre Prentissage ?
          </Typography>
          <Typography
            variant="h4"
            sx={{ mb: 4, color: "#ffffff" }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            
          </Typography>
          <Box data-aos="fade-up" data-aos-delay="200">
            <Button
              onClick={handleClick}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ff5722",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#e04a19" },
              }}
            >
              Explorer les filières
            </Button>
          </Box>
        </Container>
      </div>
    </Element>
  );
}
