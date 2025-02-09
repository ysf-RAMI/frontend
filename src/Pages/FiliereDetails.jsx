import  { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import { Col, Row, Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { moduleContext } from "../Context/ModuleContext";
import NavbarComponent from "../Components/NavbarComponent";
import "../styles/FiliereDetails.css";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
} from "@mui/material";

// Animated Card Component for smooth animation
// eslint-disable-next-line react/prop-types
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
  const { filiereId } = useParams(); // Retrieve filiereId from URL
  const { filiere } = useContext(moduleContext);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Find the selected filiere by ID
  useEffect(() => {
    const foundFiliere = filiere.find(
      (f) => f.filiereId === parseInt(filiereId)
    );
    setSelectedFiliere(foundFiliere);
  }, [filiere, filiereId]);

  // Function to handle modal opening
  const handleSearchClick = () => setOpenModal(true);

  // Function to close modal
  const handleCloseModal = () => setOpenModal(false);

  // Filtered modules based on search input
  const filteredModules = selectedFiliere
    ? selectedFiliere.modules.filter((module) =>
        module.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <NavbarComponent />

      {selectedFiliere ? (
        <Container className="main-content" style={{marginTop:"100px"}}>
          <Typography variant="h3" className="serviceMainTitle">
            Modules de {selectedFiliere.nomFiliere}
          </Typography>

          <div style={{ textAlign: "left", paddingTop: "30px" }}>
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              Cherchez un module
            </Typography>
            <TextField onClick={handleSearchClick} fullWidth />
          </div>

          <div className="module-list">
            <Row className="justify-content-center">
              {filteredModules.map((module) => (
                <Col key={module.moduleId} lg={4} md={6} sm={12}>
                  {/* Wrap the card in a Link to navigate to ModuleDetails */}
                  <Link
                    to={`/filiere/${filiereId}/module/${module.moduleId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <AnimatedCard>
                      <Card className="moduleCard">
                        <CardContent>
                          <Typography variant="h5">{module.name}</Typography>
                          <Divider style={{ margin: "15px 0" }} />
                          <Typography variant="body1">
                            {module.description}
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

      {/* Modal for Search */}
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
