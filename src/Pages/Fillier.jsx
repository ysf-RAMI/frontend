import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  TextField,
  IconButton,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";

// Skeleton Card Component for loading state
const SkeletonCard = () => {
  return (
    <Card className="filiere-card" sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={140} animation="wave" />
      <CardContent>
        <Skeleton animation="wave" height={32} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={20} width="80%" />
      </CardContent>
    </Card>
  );
};

// Filiere Card Component
const FiliereCard = ({ filiere }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="filiere-card" sx={{ height: "100%" }}>
      <CardActionArea component={Link} to={`/filiere/${filiere.id}`}>
        <CardMedia
          component="img"
          height="140"
          // eslint-disable-next-line no-undef
          image={`https://dummyimage.com/600x600/000/fff&text=${filiere.nom}`}
          onError={() => setImageError(true)} // Handle image loading errors
          alt={filiere.nom}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {filiere.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explorez les détails de la filière {filiere.nom}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Main Component
export default function Filiere() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filiere, setFiliere] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    // Simulate loading with a minimum duration to show the skeleton
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/student/getAllFiliere`
        );
        // Add a small delay to make the loading state visible
        setTimeout(() => {
          setFiliere(response.data);
          setLoading(false);
        }, 1500); // 1.5 second delay to show loading state
      } catch (error) {
        console.error("Error fetching filiere data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter filières based on search query
  const filteredFilieres = filiere.filter((f) =>
    f.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate skeleton placeholders
  const skeletonCards = Array(6)
    .fill()
    .map((_, index) => (
      <Col
        key={`skeleton-${index}`}
        lg={4}
        md={6}
        className="mb-4"
        data-aos="fade-up"
        data-aos-delay={index * 100}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <SkeletonCard />
        </div>
      </Col>
    ));

  return (
    <>
      <style>
        {`
          .filiere-card {
            transition: all 0.3s ease;
            border-radius: 8px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            height: 100%;
          }

          .filiere-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }

          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          
          .card-container {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          
          .card-wrapper {
            width: 100%;
            max-width: 400px;
          }
          
          .no-results {
            text-align: center;
            padding: 40px 0;
            width: 100%;
          }
        `}
      </style>

      <Container className="py-5 mt-4" style={{ backgroundColor: "white" }}>
        {/* Hero Section */}
        <Box className="text-center mb-5" data-aos="fade-down">
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Explorez Nos Filières
          </Typography>
          <Typography variant="h6" color="textSecondary" className="mb-4">
            Découvrez nos programmes d'études et trouvez votre parcours idéal
          </Typography>
        </Box>

        {/* Search Bar - Now directly filters cards */}
        <Box
          className="mb-5"
          data-aos="fade-up"
          sx={{ maxWidth: 600, margin: "0 auto" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher une filière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Filières Grid with Centered Cards */}
        <Row className="justify-content-center">
          {loading ? (
            skeletonCards
          ) : filteredFilieres.length > 0 ? (
            filteredFilieres.map((f, index) => (
              <Col
                key={f.id}
                lg={4}
                md={6}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="card-wrapper">
                  <FiliereCard filiere={f} />
                </div>
              </Col>
            ))
          ) : (
            <div className="no-results">
              <Typography variant="h6" color="textSecondary">
                Aucune filière trouvée pour {searchQuery}
              </Typography>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}
