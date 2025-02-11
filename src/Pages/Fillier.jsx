import { useContext, useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import  moduleContext  from "../Context/ModuleContext";
import "../styles/Fillier.css";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

// Animated Card Component for Animation
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

export default function Filiere() {
  const { filiere } = useContext(moduleContext);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle modal opening
  const handleSearchClick = () => setOpenModal(true);

  // Function to close modal
  const handleCloseModal = () => setOpenModal(false);

  // Filtered filieres based on search input
  const filteredFilieres = filiere.filter((f) =>
    f.nomFiliere.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      <Container className="text-center" style={{ marginTop: "100px" }}>
        <div style={{ textAlign: "left", paddingTop: "30px" }}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            Cherchez votre filière
          </Typography>
          <TextField onClick={handleSearchClick} fullWidth />
        </div>
        <Typography variant="h3" className="serviceMainTitle">
          Filières
        </Typography>
        <div className="bottom"></div>
        <Row className="justify-content-center align-items-center">
          {filiere.map((f) => (
            <Col key={f.filiereId} lg={4} md={6} sm={12}>
              <Link
                to={`/filiere/${f.filiereId}`}
                className="link-button text-decoration-none"
              >
                <AnimatedCard>
                  <Card className="serviceCard">
                    <CardContent>
                      <Typography variant="h5" className="serviceName">
                        {f.nomFiliere}
                      </Typography>
                      <Divider style={{ margin: "15px 0" }} />
                      <Typography
                        variant="body1"
                        style={{ textAlign: "left", color: "#333" }}
                      >
                        Modules
                      </Typography>
                      <ul style={{ marginTop: "10px" }}>
                        {f.modules.map((m) => (
                          <li key={m.moduleId} style={{ textAlign: "left" }}>
                            {m.name}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for Search */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h5" style={{ fontWeight: 700 }}>
            Rechercher une filière
          </Typography>
        </DialogTitle>
        <DialogContent >
          <Autocomplete
          sx={{marginTop:"10px"}}
            freeSolo
            fullWidth
            options={filiere.map((f) => f.nomFiliere)}
            onInputChange={(event, newInputValue) =>
              setSearchQuery(newInputValue)
            }
            renderInput={(params) => (
              <TextField  {...params} label="Rechercher..." />
            )}
          />
          <div style={{ marginTop: "15px" }}>
            {filteredFilieres.length > 0 ? (
              filteredFilieres.map((f) => (
                <Link to={`/filiere/${f.filiereId}`} key={f.filiereId}>
                  <Card variant="outlined" style={{ marginBottom: "10px" }}>
                    <CardContent>
                      <Typography variant="body1" style={{ fontWeight: 600 }}>
                        {f.nomFiliere}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                Aucune filière trouvée.
              </Typography>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
  