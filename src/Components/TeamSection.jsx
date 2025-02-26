import React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { Row, Col } from "reactstrap";
import picimg from "../assets/hamoutpic.jpg";

const TeamSection = () => {
  const membresEquipe = [
    {
      nom: "Youssef RAMI",
      role: "Frontend Developer",
      image: picimg,
    },
    {
      nom: "Yassine BOUGROUOU",
      role: "Backend Developer",
      image: picimg,
    },
    {
      nom: "Souhail BABILE",
      role: "Backend Developer",
      image: picimg,
    },
    {
      nom: "Dr. Hemza HAMOUT",
      role: "Chef de projet",
      image: picimg,
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
          Rencontrez notre équipe de direction
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
          Nous sommes une équipe innovante ayant créé la plateforme Doctor H1
          pour le moteur de cours en ligne, engagée à offrir des solutions de
          qualité à nos utilisateurs.
        </Typography>
      </div>

      <Row>
        {membresEquipe.map((membre, index) => (
          <Col xs={12} sm={6} lg={3} key={membre.nom} className="mb-4">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">
                <img
                  src={picimg}
                  alt={membre.nom}
                  style={{
                    width: "260px",
                    height: "260px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto",
                    display: "block",
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
                <IconButton
                  size="small"
                  style={{
                    color: "#9CA3AF",
                  }}
                >
                  <TwitterIcon style={{ fontSize: "20px" }} />
                </IconButton>
                <IconButton
                  size="small"
                  style={{
                    color: "#9CA3AF",
                  }}
                >
                  <LinkedInIcon color="primary" style={{ fontSize: "20px" }} />
                </IconButton>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamSection;
