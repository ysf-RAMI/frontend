import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import moduleContext from "../Context/ModuleContext";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import "../styles/FiliereDetails.css";

// Animated Card Component for smooth animation
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

export default function FiliereDetails() {
  const { filiereId } = useParams();
  const { filiere } = useContext(moduleContext);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const foundFiliere = filiere.find(
      (f) => f.filiereId === parseInt(filiereId)
    );
    setSelectedFiliere(foundFiliere);
  }, [filiere, filiereId]);

  const handleSearchClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const filteredModules = selectedFiliere
    ? selectedFiliere.modules.filter((module) =>
        module.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {selectedFiliere ? (
        <Container className="main-content" style={{ marginTop: "100px" }}>
          {/* Filière Title */}
          <Typography variant="h3" className="serviceMainTitle">
            {selectedFiliere.nomFiliere}
          </Typography>

          {/* Search Bar */}
          <div style={{ textAlign: "left", paddingTop: "30px" }}>
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              Rechercher un module
            </Typography>
            <TextField
              onClick={handleSearchClick}
              fullWidth
              placeholder="Tapez pour rechercher..."
            />
          </div>

          {/* Module List */}
          <div className="module-list">
            <Row className="justify-content-center">
              {filteredModules.map((module) => (
                <Col key={module.moduleId} lg={4} md={6} sm={12}>
                  <Link
                    to={`/filiere/${filiereId}/module/${module.moduleId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <AnimatedCard>
                      <Card className="moduleCard">
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            {module.name}
                          </Typography>
                          <Divider style={{ margin: "15px 0" }} />
                          <Typography variant="body1" color="textSecondary">
                            {module.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ marginTop: "10px", color: "#666" }}
                          >
                            <strong>Crédits:</strong> {module.credits}
                          </Typography>
                          <Typography variant="body2" style={{ color: "#666" }}>
                            <strong>Responsable:</strong> {module.responsable}
                          </Typography>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      ) : (
        <Container>
          <Typography variant="h5" color="textSecondary">
            Filière introuvable.
          </Typography>
        </Container>
      )}

      {/* Search Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h5" style={{ fontWeight: 700 }}>
            Rechercher un module
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            sx={{ marginTop: "10px" }}
            freeSolo
            fullWidth
            options={
              selectedFiliere ? selectedFiliere.modules.map((m) => m.name) : []
            }
            onInputChange={(event, newInputValue) =>
              setSearchQuery(newInputValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Rechercher..." />
            )}
          />
          <div style={{ marginTop: "15px" }}>
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <Link
                  to={`/filiere/${filiereId}/module/${module.moduleId}`}
                  key={module.moduleId}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    variant="outlined"
                    style={{ marginBottom: "10px", cursor: "pointer" }}
                  >
                    <CardContent>
                      <Typography variant="body1" style={{ fontWeight: 600 }}>
                        {module.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {module.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                Aucun module trouvé.
              </Typography>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
