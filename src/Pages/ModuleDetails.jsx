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

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedContent(null);
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

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        marginTop: "76px",
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
            backgroundColor: "#263238",
            color: "#fff",
            height: "calc(100% - 76px)",
            marginTop: "83px",
          },
        }}
      >
        <Box sx={{ width: 260, padding: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            {selectedModule.name}
          </Typography>
          <Divider />
          <List>
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
                  "&:hover": { backgroundColor: "#37474F" },
                  borderRadius: 1,
                  mb: 1,
                  ":active": { backgroundColor: "#455A64" },
                  backgroundColor: selectedSection === section ? "#37474F" : "",
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
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 5,
                backgroundColor: "#f9f9f9",
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              <List>
                {selectedModule[selectedSection]?.map((item) => (
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => openContent(item)}
                    sx={{
                      "&:hover": { backgroundColor: "#eaeaea" },
                      borderRadius: 1,
                      mb: 1,
                    }}
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
