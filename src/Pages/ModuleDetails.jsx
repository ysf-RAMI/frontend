import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  Grid,
  Fade,
  TextField,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFilePdf,
  faPlayCircle,
  faListUl,
  faChartBar,
  faTimes,
  faDownload,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

// Helper function to convert YouTube URL to embed format
const getEmbedUrl = (youtubeUrl) => {
  const regex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = youtubeUrl.match(regex);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const ModuleDetails = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const { moduleId } = useParams();
  const [selectedSection, setSelectedSection] = useState("COURS");
  const [selectedContent, setSelectedContent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [filterType, setFilterType] = useState("all"); // Filter by type (PDF/Video)
  const [page, setPage] = useState(1); // Pagination
  const [filteredResources, setFilteredResources] = useState([]); // Filtered resources
  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen state for PDF

  const iframeRef = useRef(null); // Ref for the iframe

  const itemsPerPage = 5; // Items per page for pagination

  // Fetch resources by moduleId
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/student/getAllResourcesByModuleId/${moduleId}`
      )
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, [moduleId]);

  // Filter resources by section, search query, and type
  useEffect(() => {
    const filtered = resources
      .filter((resource) => resource.type === selectedSection) // Filter by section
      .filter((resource) => {
        const matchesSearch = resource.nom
          .toLowerCase()
          .includes(searchQuery.toLowerCase()); // Filter by search query
        const matchesFilter =
          filterType === "all" ||
          (filterType === "pdf" && resource.dataType === "FICHIER") ||
          (filterType === "video" && resource.dataType === "VIDEO");
        return matchesSearch && matchesFilter;
      });
    setFilteredResources(filtered);
  }, [resources, selectedSection, searchQuery, filterType]);

  // Handle section change
  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setPage(1); // Reset to first page
  };

  // Open content dialog
  const openContent = (item) => {
    setSelectedContent(item);
    setOpenDialog(true);
    setIsFullScreen(false); // Reset full-screen state when opening a new dialog
  };

  // Close content dialog
  const handleCloseDialog = () => {
    setSelectedContent(null);
    setOpenDialog(false);
  };

  // Toggle full-screen mode for the PDF iframe
  const toggleFullScreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setPage(1); // Reset to first page
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        userSelect: "none",
      }}
    >
      {/* Persistent Drawer */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          width: 270,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 270,
            boxSizing: "border-box",
            backgroundColor: "#01162e",
            borderRadius: "0 20px 20px 0",
            color: "#fff",
            height: "calc(100% - 76px)",
            marginTop: "76px",
          },
        }}
      >
        <Box sx={{ width: 260, padding: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            Module Resources
          </Typography>
          <Divider />
          <List style={{ cursor: "pointer" }}>
            {["COURS", "TD", "TP", "EXAM"].map((section) => (
              <ListItem
                key={section}
                button
                onClick={() => handleSectionClick(section)}
                sx={{
                  "&:hover": { backgroundColor: "#003366" },
                  borderRadius: 1,
                  mb: 1,
                  ":active": { backgroundColor: "#002366" },
                  backgroundColor: selectedSection === section ? "#003366" : "",
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <FontAwesomeIcon
                    icon={
                      section === "COURS"
                        ? faBook
                        : section === "TD"
                          ? faListUl
                          : section === "TP"
                            ? faChartBar
                            : faFilePdf
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={section} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          mt: 4,
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ maxWidth: 1200, width: "100%", mt: 2 }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {selectedSection}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <TextField
                label="Search"
                variant="filled"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ width: "300px" }}
              />
              <FormControl sx={{ width: "200px" }}>
                <InputLabel>Filter by Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={handleFilterChange}
                  label="Filter by Type"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 5,
                backgroundColor: "#f9f9f9",
              }}
            >
              <List>
                {filteredResources
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((resource) => (
                    <ListItem
                      key={resource.id}
                      button
                      onClick={() => openContent(resource)}
                      sx={{
                        "&:hover": { backgroundColor: "#eaeaea" },
                        borderRadius: 1,
                        mb: 1,
                      }}
                      data-aos="fade-up"
                    >
                      <ListItemIcon>
                        {resource.dataType === "FICHIER" ? (
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            style={{ color: "blue" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={resource.nom} />
                    </ListItem>
                  ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={Math.ceil(filteredResources.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog for PDF/Video Preview */}
      <Dialog
        open={openDialog && selectedContent !== null}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Fade}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{selectedContent?.nom}</Typography>
            <Box>
              {selectedContent?.dataType === "FICHIER" && (
                <IconButton onClick={toggleFullScreen}>
                  <FontAwesomeIcon
                    icon={isFullScreen ? faCompress : faExpand}
                    style={{ color: "black" }}
                  />
                </IconButton>
              )}
              <IconButton onClick={handleCloseDialog}>
                <FontAwesomeIcon icon={faTimes} style={{ color: "black" }} />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent?.dataType === "FICHIER" ? (
            <iframe
              ref={iframeRef}
              src={`http://localhost:8080/api/files/getFile/${selectedContent.lien}#toolbar=0`}
              width="100%"
              height="480px"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          ) : selectedContent?.dataType === "VIDEO" ? (
            <iframe
              title={selectedContent.nom}
              src={getEmbedUrl(selectedContent.lien)}
              width="100%"
              height="500px"
              allow="autoplay"
              style={{ border: "none" }}
              allowFullScreen
            />
          ) : (
            <Typography variant="body1" align="center">
              No content available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModuleDetails;
