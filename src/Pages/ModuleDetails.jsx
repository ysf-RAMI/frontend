import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import moduleContext from "../Context/ModuleContext";
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
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../styles/Module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

// Helper function to convert YouTube URL to embed format
const getEmbedUrl = (youtubeUrl) => {
  const regex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = youtubeUrl.match(regex);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const ModuleDetails = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const { filiereId, moduleId } = useParams();
  const { filiere } = useContext(moduleContext);

  const [selectedSection, setSelectedSection] = useState("courses");
  const [selectedContent, setSelectedContent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedContent(null);
    setPage(1); // Reset to first page when section changes
    if (isSmallScreen && isDrawerOpen) {
      toggleDrawer(false);
    }
  };

  const openContent = (item) => {
    setSelectedContent(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedContent(null);
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when search query changes
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  useEffect(() => {
    const foundFiliere = filiere.find(
      (f) => f.filiereId === parseInt(filiereId)
    );
    if (foundFiliere) {
      const foundModule = foundFiliere.modules.find(
        (m) => m.moduleId === parseInt(moduleId)
      );
      setSelectedModule(foundModule);
    }
  }, [filiere, filiereId, moduleId]);

  if (!selectedModule) {
    return (
      <Typography variant="h5" sx={{ mt: 5 }}>
        Module not found
      </Typography>
    );
  }

  const filteredContent = selectedModule[selectedSection]
    ?.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
            {selectedModule.name}
          </Typography>
          <Divider />
          <List style={{ cursor: "pointer" }}>
            {[
              { name: "Courses", icon: faBook, section: "courses" },
              { name: "TD", icon: faListUl, section: "TD" },
              { name: "TP", icon: faChartBar, section: "TP" },
              { name: "Exams", icon: faFilePdf, section: "EXAMS" },
            ].map(({ name, icon, section }) => (
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
                  <FontAwesomeIcon icon={icon} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
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
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
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
                variant="outlined"
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
                {filteredContent?.map((item) => (
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => openContent(item)}
                    sx={{
                      "&:hover": { backgroundColor: "#eaeaea" },
                      borderRadius: 1,
                      mb: 1,
                    }}
                    data-aos="fade-up" // Add AOS animation
                  >
                    <ListItemIcon>
                      {item.type === "pdf" ? (
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
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={Math.ceil(
                    selectedModule[selectedSection]?.length / itemsPerPage
                  )}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Modal Dialog for Content Preview */}
      <Dialog
        open={openDialog && selectedContent !== null}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Fade} // Add fade animation
        aria-labelledby="content-dialog-title"
      >
        <DialogTitle id="content-dialog-title">
          {selectedContent?.name}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="close-dialog"
          >
            <FontAwesomeIcon icon={faTimes} style={{ color: "black" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent?.type === "pdf" && selectedContent?.url ? (
            <>
              <iframe
                title={selectedContent.name}
                src={selectedContent.url}
                width="100%"
                height="500px"
                style={{ border: "none" }}
              />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faDownload} />}
                  href={selectedContent.url}
                  download
                >
                  Download PDF
                </Button>
              </Box>
            </>
          ) : selectedContent?.type === "video" && selectedContent?.url ? (
            <iframe
              title={selectedContent.name}
              src={getEmbedUrl(selectedContent.url)} // Use the embed URL
              width="100%"
              height="500px"
              allow="autoplay"
              style={{ border: "none" }}
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
