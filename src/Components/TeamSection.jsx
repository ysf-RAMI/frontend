import React from "react";
import { Container, Typography, IconButton } from "@mui/material";
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram,
  Email,
} from "@mui/icons-material";
import { Row, Col } from "reactstrap";
import { FaResearchgate } from "react-icons/fa";
import picimg from "../assets/hamoutpic.jpg";
import yassine from "../assets/team/yassine.jpg";
import youssef from "../assets/team/youssef.jpg";
import souhail from "../assets/team/souhail.jpg";
import drhamout from "../assets/hamoutpic.jpg";

const TeamSection = () => {
  const membresEquipe = [
    {
      nom: "Youssef RAMI",
      role: "Développeur Fullstack",
      image: youssef,
      email: "yousseframi012@gmail.com",
      instagram: "https://www.instagram.com/rammi_yssf",
      linkedin: "https://www.linkedin.com/in/youssef-rami/",
    },
    {
      nom: "Yassine BOUGROUOU",
      role: "Développeur Fullstack",
      image: yassine,
      email: "yssinebougrou@gmail.com",
      instagram: "https://www.instagram.com/rammi_yssf",
      linkedin: "linkedin.com/in/youssef-rami",
    },
    {
      nom: "Souhail BABILE",
      role: "Développeur Fullstack",
      image: souhail,
      email: "souhailbabile@gmail.com",
      linkedin: "linkedin.com/in/souhail-babile-54736324b",
    },
    {
      nom: "Dr. Hemza HAMOUT",
      role: "Chef de projet",
      image: drhamout,
      email: "h.hamout@uiz.ac.ma",
      researchGate: "https://www.researchgate.net/profile/Hamza-Hamout",
    },
  ];

  return (
    <Container
      maxWidth="xl"
      className="py-5"
      style={{ backgroundColor: "#f1f4f6" }}
    >
      <div className="text-center mb-5" data-aos="fade-up">
        <Typography
          variant="h2"
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          Rencontrez Notre Équipe
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            color: "#4B5563",
            maxWidth: "900px",
            margin: "0 auto",
            marginBottom: "3rem",
          }}
        >
          Nous sommes une équipe innovante qui a créé la plateforme Doctor H1,
          dédiée à fournir des solutions de qualité pour l'apprentissage en
          ligne.
        </Typography>
      </div>

      <Row>
        {membresEquipe.map((membre, index) => (
          <Col xs={12} sm={6} lg={3} className="mb-4" key={membre.nom}>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.01)",
                transition: "transform 0.3s ease-in-out",
                ":hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <div
                className="mb-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={membre.image}
                  alt={membre.nom}
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </div>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                {membre.nom}
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#6B7280",
                  marginBottom: "1rem",
                }}
              >
                {membre.role}
              </Typography>
              <div className="d-flex justify-content-center gap-2">
                {membre.email && (
                  <IconButton
                    size="small"
                    style={{ color: "#9CA3AF" }}
                    onClick={() =>
                      (window.location.href = `mailto:${membre.email}`)
                    }
                  >
                    <Email style={{ fontSize: "20px" }} />
                  </IconButton>
                )}
                {membre.linkedin && (
                  <IconButton
                    size="small"
                    style={{ color: "#9CA3AF" }}
                    onClick={() => window.open(membre.linkedin, "_blank")}
                  >
                    <LinkedInIcon
                      color="primary"
                      style={{ fontSize: "20px" }}
                    />
                  </IconButton>
                )}
                {membre.researchGate && (
                  <IconButton
                    size="small"
                    style={{ color: "#9CA3AF" }}
                    onClick={() => window.open(membre.researchGate, "_blank")}
                  >
                    <FaResearchgate
                      color="primary"
                      style={{ fontSize: "20px" }}
                    />
                  </IconButton>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamSection;
