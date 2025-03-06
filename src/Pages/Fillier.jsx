import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  IconButton,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const baseUrl = "http://localhost:8080";

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

// Search Dialog Component
const SearchDialog = ({ open, handleClose, filiere }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFilieres = filiere.filter((f) =>
    f.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Rechercher une filière
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo
          options={filiere.map((f) => f.nom)}
          onInputChange={(_, value) => setSearchQuery(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Rechercher..."
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Box sx={{ mt: 3 }}>
          {filteredFilieres.map((f) => (
            <Link
              key={f.id}
              to={`/filiere/${f.id}`}
              style={{ textDecoration: "none" }}
              onClick={handleClose}
            >
              <Box
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <Typography variant="body1">{f.nom}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export default function Filiere() {
  const [openSearch, setOpenSearch] = useState(false);
  const [filiere, setFiliere] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    axios.get(`${baseUrl}/api/student/getAllFiliere`).then((response) => {
      setFiliere(response.data);
    });
  }, []);

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

        {/* Search Bar */}
        <Box
          className="mb-5"
          data-aos="fade-up"
          sx={{ maxWidth: 600, margin: "0 auto" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher une filière..."
            onClick={() => setOpenSearch(true)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Filières Grid */}
        <Row>
          {filiere.map((f, index) => (
            <Col
              key={f.id}
              lg={4}
              md={6}
              className="mb-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <FiliereCard filiere={f} />
            </Col>
          ))}
        </Row>

        {/* Search Dialog */}
        <SearchDialog
          open={openSearch}
          handleClose={() => setOpenSearch(false)}
          filiere={filiere}
        />
      </Container>
    </>
  );
}
