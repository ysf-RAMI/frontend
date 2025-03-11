import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Badge,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFilePdf,
  faPlayCircle,
  faListUl,
  faChartBar,
  faTimes,
  faExpand,
  faCompress,
  faBars,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import logo from "../assets/logoSite.png";
import { ArrowBack, Home, Search, FilterList } from "@mui/icons-material";

const getEmbedUrl = (youtubeUrl) => {
  const regex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = youtubeUrl.match(regex);
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : null;
};

// eslint-disable-next-line react/prop-types
const ModuleDetails = ({ isDrawerOpen, toggleDrawer }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";

  const [selectedSection, setSelectedSection] = useState("COURS");
  const [selectedContent, setSelectedContent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resourceCounts, setResourceCounts] = useState({
    COURS: 0,
    TD: 0,
    TP: 0,
    EXAM: 0,
  });

  const iframeRef = useRef(null);
  const tableContainerRef = useRef(null);

  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/student/getAllResourcesByModuleId/${moduleId}`)
      .then((response) => {
        setResources(response.data);

        // Calculate resource counts by type
        const counts = response.data.reduce((acc, resource) => {
          acc[resource.type] = (acc[resource.type] || 0) + 1;
          return acc;
        }, {});

        setResourceCounts({
          COURS: counts.COURS || 0,
          TD: counts.TD || 0,
          TP: counts.TP || 0,
          EXAM: counts.EXAM || 0,
        });

        setTimeout(() => setLoading(false), 800); // Artificial delay for skeleton effect
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        setLoading(false);
      });
  }, [moduleId, selectedSection]);

  useEffect(() => {
    const filtered = resources
      .filter((resource) => resource.type === selectedSection)
      .filter((resource) => {
        const matchesSearch = resource.nom
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesFilter =
          filterType === "all" ||
          (filterType === "pdf" && resource.dataType === "FICHIER") ||
          (filterType === "video" && resource.dataType === "VIDEO");
        return matchesSearch && matchesFilter;
      });
    setFilteredResources(filtered);
  }, [resources, selectedSection, searchQuery, filterType]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setPage(1);
    if (isSmallScreen) toggleDrawer(false);
  };

  const openContent = (item) => {
    setSelectedContent(item);
    setOpenDialog(true);
    setIsFullScreen(false);
    if (isSmallScreen) toggleDrawer(false);
  };

  const handleCloseDialog = () => {
    setSelectedContent(null);
    setOpenDialog(false);
  };

  const toggleFullScreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of table when page changes
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        userSelect: "none",
        backgroundColor: "#fff",
      }}
    >
      {/* Drawer */}
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
          },
        }}
      >
        <Box sx={{ width: 260, padding: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70%",
              padding: "10px",
              marginBottom: "40px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 2,
              color: "#e0e0e0",
              fontWeight: "600",
            }}
          >
            Module Resources
          </Typography>
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mb: 2 }} />
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
                  ":active": { backgroundColor: "#003366" },
                  backgroundColor: selectedSection === section ? "#003366" : "",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "visible",
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
                <Badge
                  badgeContent={resourceCounts[section]}
                  color="primary"
                  sx={{
                    mr: 1,
                    "& .MuiBadge-badge": {
                      fontSize: "0.6rem",
                      height: "18px",
                      minWidth: "18px",
                      backgroundColor: "#1976d2",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin 0.3s ease",
        }}
      >
        {/* Transparent AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width:
              isDrawerOpen && !isSmallScreen ? "calc(100% - 270px)" : "100%",
            ml: isDrawerOpen && !isSmallScreen ? "270px" : 0,
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            color: "#333",
            transition: "width 0.3s ease, margin 0.3s ease",
          }}
        >
          <Toolbar>
            {/* Menu Control Icon (Top-Left) */}
            <IconButton
              edge="start"
              disabled={isSmallScreen ? false : true}
              onClick={() => toggleDrawer(!isDrawerOpen)}
              sx={{ mr: 2 }}
            >
              <FontAwesomeIcon color="#1976d2" icon={faBars} />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton onClick={() => navigate("/")} sx={{ mr: 2 }}>
              <Home style={{ color: "#1976d2" }} />
            </IconButton>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack style={{ color: "#1976d2" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            p: 3,
            pt: 10,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  backgroundColor: "#1976d2",
                  mb: 3,
                }}
                data-aos="fade-down"
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {selectedSection} Materials
                  <Typography
                    component="span"
                    sx={{
                      ml: 2,
                      fontSize: "1rem",
                      opacity: 0.8,
                      verticalAlign: "middle",
                    }}
                  >
                    {filteredResources.length} resource
                    {filteredResources.length !== 1 ? "s" : ""}
                  </Typography>
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <TextField
                  label="Search resources"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{
                    width: { xs: "100%", sm: "300px" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Search sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
                <FormControl sx={{ width: { xs: "100%", sm: "200px" } }}>
                  <InputLabel>Resource Type</InputLabel>
                  <Select
                    value={filterType}
                    onChange={handleFilterChange}
                    label="Resource Type"
                    sx={{ borderRadius: "8px" }}
                    InputProps={{
                      startAdornment: (
                        <FilterList sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="pdf">PDF Documents</MenuItem>
                    <MenuItem value="video">Video Lessons</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  backgroundColor: "#ffffff",
                  overflow: "hidden",
                  width: "100%",
                }}
                data-aos="fade-up"
              >
                {loading ? (
                  <Box sx={{ p: 2 }}>
                    {[...Array(itemsPerPage)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", mb: 2, alignItems: "center" }}
                      >
                        <Skeleton
                          variant="circular"
                          width={40}
                          height={40}
                          sx={{ mr: 2 }}
                        />
                        <Box sx={{ width: "100%" }}>
                          <Skeleton variant="text" width="60%" height={30} />
                          <Box sx={{ display: "flex", mt: 1 }}>
                            <Skeleton
                              variant="text"
                              width={100}
                              height={20}
                              sx={{ mr: 2 }}
                            />
                            <Skeleton variant="text" width={120} height={20} />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                      maxHeight: "calc(100vh - 280px)",
                      width: "100%",
                    }}
                    ref={tableContainerRef}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
                          <TableCell width="50%">Resource Name</TableCell>
                          <TableCell width="20%">Type</TableCell>
                          <TableCell width="20%">Added On</TableCell>
                          <TableCell width="10%">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredResources.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              align="center"
                              sx={{ py: 4 }}
                            >
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                No resources found for the selected criteria
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredResources
                            .slice(
                              (page - 1) * itemsPerPage,
                              page * itemsPerPage
                            )
                            .map((resource) => (
                              <TableRow
                                key={resource.id}
                                hover
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": { backgroundColor: "#f5f9ff" },
                                  transition: "background-color 0.2s",
                                }}
                                data-aos="fade-up"
                                data-aos-delay={100}
                                onClick={() => openContent(resource)}
                              >
                                <TableCell sx={{ fontWeight: "500" }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {resource.dataType === "FICHIER" ? (
                                      <FontAwesomeIcon
                                        icon={faFilePdf}
                                        style={{
                                          color: "#1976d2",
                                          marginRight: "12px",
                                          fontSize: "1.2rem",
                                        }}
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        icon={faPlayCircle}
                                        style={{
                                          color: "#1976d2",
                                          marginRight: "12px",
                                          fontSize: "1.2rem",
                                        }}
                                      />
                                    )}
                                    {resource.nom}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                      borderRadius: "20px",
                                      color: "#1976d2",
                                      borderColor: "#1976d2",
                                      textTransform: "none",
                                      "&:hover": {
                                        borderColor: "#1976d2",
                                        backgroundColor:
                                          "rgba(25, 118, 210, 0.08)",
                                      },
                                    }}
                                  >
                                    {resource.dataType === "FICHIER"
                                      ? "Document"
                                      : "Video"}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCalendarAlt}
                                      style={{
                                        color: "#757575",
                                        marginRight: "8px",
                                        fontSize: "0.9rem",
                                      }}
                                    />
                                    {resource.dateAjout
                                      ? formatDate(resource.dateAjout)
                                      : "N/A"}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#1976d2",
                                      borderRadius: "8px",
                                      textTransform: "none",
                                      "&:hover": {
                                        backgroundColor: "#1565c0",
                                      },
                                    }}
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Pagination
                    count={Math.ceil(filteredResources.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    disabled={loading}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Dialog for PDF/Video Preview */}
      <Dialog
        open={openDialog && selectedContent !== null}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedContent?.dataType === "FICHIER" ? (
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{
                    color: "#1976d2",
                    marginRight: "12px",
                    fontSize: "1.2rem",
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  style={{
                    color: "#1976d2",
                    marginRight: "12px",
                    fontSize: "1.2rem",
                  }}
                />
              )}
              {selectedContent?.nom}
            </Typography>
            <Box>
              {selectedContent?.dataType === "FICHIER" && (
                <IconButton onClick={toggleFullScreen} sx={{ mr: 1 }}>
                  <FontAwesomeIcon
                    icon={isFullScreen ? faCompress : faExpand}
                    style={{ color: "#1976d2" }}
                  />
                </IconButton>
              )}
              <IconButton onClick={handleCloseDialog}>
                <FontAwesomeIcon icon={faTimes} style={{ color: "#1976d2" }} />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent?.dataType === "FICHIER" ? (
            <Box sx={{ position: "relative", height: "480px" }}>
              <iframe
                ref={iframeRef}
                src={`${baseUrl}/api/files/getFile/${selectedContent.lien}#toolbar=1`}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  borderRadius: "4px",
                }}
                title="PDF Viewer"
              />
            </Box>
          ) : selectedContent?.dataType === "VIDEO" ? (
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                title={selectedContent.nom}
                src={getEmbedUrl(selectedContent.lien)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 8 }}>
              No content available for preview.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModuleDetails;
