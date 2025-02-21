import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  Button,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import moduleContext from "../Context/ModuleContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Filiere Card Component
const FiliereCard = ({ filiere }) => (
  <Card
    className="filiere-card shadow-sm"
    data-aos="fade-up"
    sx={{
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: 3,
      },
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom component="div" className="mb-3">
        {filiere.nomFiliere}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Modules disponibles
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mt: 2,
          justifyContent: "center",
        }}
      >
        {filiere.modules.map((module) => (
          <Chip
            key={module.moduleId}
            label={module.name}
            size="small"
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
      <Button
        component={Link}
        to={`/filiere/${filiere.filiereId}`}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Explorer
      </Button>
    </CardContent>
  </Card>
);

// Search Dialog Component
const SearchDialog = ({ open, handleClose, filiere }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFilieres = filiere.filter((f) =>
    f.nomFiliere.toLowerCase().includes(searchQuery.toLowerCase())
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
          options={filiere.map((f) => f.nomFiliere)}
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
              key={f.filiereId}
              to={`/filiere/${f.filiereId}`}
              style={{ textDecoration: "none" }}
              onClick={handleClose}
            >
              <Card
                sx={{
                  mb: 2,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {f.nomFiliere}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {f.modules.length} modules disponibles
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export default function Filiere() {
  const { filiere } = useContext(moduleContext);
  const [openSearch, setOpenSearch] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
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

      <Container className="py-5 mt-4">
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
              key={f.filiereId}
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
