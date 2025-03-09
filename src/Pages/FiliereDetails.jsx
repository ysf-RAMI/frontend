import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FiliereDetails.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Initialize AOS animations
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

export default function FiliereDetails() {
  const { filiereId } = useParams();
  const [modules, setModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("all");
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/student/getAllModuleByFiliereId/${filiereId}`)
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching modules:", error);
      });
  }, [filiereId]);

  const handleSearchClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Filter modules by semester and search query
  const filteredModules = modules.filter((module) => {
    const matchesSemester =
      selectedSemester === "all" || module.semestre === selectedSemester;
    const matchesSearch = module.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  // Extract unique semesters for the filter dropdown
  const semesters = [...new Set(modules.map((module) => module.semestre))];

  return (
    <Container
      className="main-content"
      style={{ marginTop: "100px", marginBottom: "30px" }}
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
      {/* Filière Title */}
      <Typography
        variant="h4"
        className="serviceMainTitle"
        data-aos="fade-down"
      >
        {modules.length > 0 ? modules[0].filiereName : "Filière"}
      </Typography>

      {/* Search Bar and Semester Filter */}
      <div style={{ textAlign: "left", paddingTop: "30px" }} data-aos="fade-up">
        <Typography variant="h7" style={{ marginBottom: "20px" }}>
          Rechercher un module
        </Typography>
        <TextField
          onClick={handleSearchClick}
          fullWidth
          placeholder="Tapez pour rechercher..."
          style={{ marginBottom: "20px" }}
        />
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="semester-filter-label">Semestre</InputLabel>
          <Select
            labelId="semester-filter-label"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            label="Semestre"
          >
            <MenuItem value="all">Tous les semestres</MenuItem>
            {semesters.map((semester) => (
              <MenuItem key={semester} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Module List */}
      <div className="module-list" >
        <Row className="justify-content-center" style={{gap:"10px 0"}}>
          {filteredModules.map((module) => (
            <Col key={module.id} lg={4} md={6} sm={12} data-aos="fade-up">
              <Link
                to={`/filiere/${filiereId}/module/${module.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="moduleCard">
                  <CardContent>
                    <img
                      src={`https://dummyimage.com/400x170/000/fff&text=${module.name}`}
                      alt={module.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "8px",
                      }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginTop: "10px" }}
                    >
                      {module.name}
                    </Typography>
                    <Divider style={{ margin: "15px 0" }} />
                    <Typography variant="body1" color="textSecondary">
                      {module.description}
                    </Typography>
                    <Chip
                      label={module.semestre}
                      color="primary"
                      style={{ marginTop: "10px" }}
                    />
                  </CardContent>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

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
            options={modules.map((m) => m.name)}
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
                  to={`/filiere/${filiereId}/module/${module.id}`}
                  key={module.id}
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
                      <Chip
                        label={module.semestre}
                        color="primary"
                        style={{ marginTop: "10px" }}
                      />
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
    </Container>
  );
}
