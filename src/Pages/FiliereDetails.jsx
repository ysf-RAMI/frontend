import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  TextField,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Skeleton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FiliereDetails.css";
import axios from "axios";

// Module Card Skeleton Component
const ModuleCardSkeleton = () => {
  return (
    <Card className="moduleCard">
      <CardContent>
        <Skeleton
          variant="rectangular"
          height={200}
          animation="wave"
          style={{ borderRadius: "8px" }}
        />
        <Skeleton
          height={36}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <Divider style={{ margin: "15px 0" }} />
        <Skeleton height={20} />
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton
          height={32}
          width={100}
          style={{ marginTop: "10px", borderRadius: "16px" }}
        />
      </CardContent>
    </Card>
  );
};

// Module Card Component
const ModuleCard = ({ module, filiereId }) => {
  return (
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
          <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
            {module.name}
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
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
  );
};

export default function FiliereDetails() {
  const { filiereId } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [filiereName, setFiliereName] = useState("Filière");
  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/student/getAllModuleByFiliereId/${filiereId}`
        );

        setTimeout(() => {
          const data = response.data;
          setModules(data);
          if (data.length > 0) {
            setFiliereName(data[0].filiereName);
          }
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [filiereId]);

  const filteredModules = modules.filter((module) => {
    const matchesSemester =
      selectedSemester === "all" || module.semestre === selectedSemester;
    const matchesSearch = module.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  const semesters = [...new Set(modules.map((module) => module.semestre))];

  // Generate skeleton placeholders
  const skeletonCards = Array(6)
    .fill()
    .map((_, index) => (
      <Col
        key={`skeleton-${index}`}
        lg={4}
        md={6}
        sm={12}
        className="mb-4"
        data-aos="fade-up"
        data-aos-delay={index * 100}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="card-wrapper">
          <ModuleCardSkeleton />
        </div>
      </Col>
    ));

  return (
    <Container
      className="main-content"
      style={{ marginTop: "100px", marginBottom: "30px" }}
    >
      <style>
        {`
          .moduleCard {
            height: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .moduleCard:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

      {/* Filière Title */}
      <Typography
        variant="h4"
        className="serviceMainTitle"
        data-aos="fade-down"
      >
        {loading ? <Skeleton width={300} height={50} /> : filiereName}
      </Typography>

      {/* Search Bar and Semester Filter */}
      <div style={{ textAlign: "left", paddingTop: "30px" }} data-aos="fade-up">
        <Typography variant="h7" style={{ marginBottom: "20px" }}>
          Rechercher un module
        </Typography>
        <TextField
          fullWidth
          placeholder="Tapez pour rechercher..."
          style={{ marginBottom: "20px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
        />
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="semester-filter-label">Semestre</InputLabel>
          <Select
            labelId="semester-filter-label"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            label="Semestre"
            disabled={loading}
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
      <div className="module-list">
        <Row className="justify-content-center" style={{ gap: "20px 0" }}>
          {loading ? (
            skeletonCards
          ) : filteredModules.length > 0 ? (
            filteredModules.map((module) => (
              <Col
                key={module.id}
                lg={4}
                md={6}
                sm={12}
                data-aos="fade-up"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <div className="card-wrapper">
                  <ModuleCard module={module} filiereId={filiereId} />
                </div>
              </Col>
            ))
          ) : (
            <div className="no-results">
              <Typography variant="h6" color="textSecondary">
                {searchQuery.length > 0
                  ? `Aucun module trouvé pour la recherche : ${searchQuery}`
                  : "Aucun module disponible dans cette filière"}
              </Typography>
            </div>
          )}
        </Row>
      </div>
    </Container>
  );
}
