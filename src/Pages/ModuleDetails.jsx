import  { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { moduleContext } from "../Context/ModuleContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CssBaseline,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import {
  Menu,
  PictureAsPdf,
  PlayCircleOutline,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import VideoPlayer from "../Components/Videos";
import PDFViewer from "../Components/PDFViewer";

const drawerWidth = 300;

export default function ModuleDetails() {
  const { filiereId, moduleId } = useParams(); // Retrieve filiereId and moduleId from URL
  const { filiere } = useContext(moduleContext);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  // Find the selected filiere and module by IDs
  useEffect(() => {
    const foundFiliere = filiere.find(
      (f) => f.filiereId === parseInt(filiereId)
    );
    if (foundFiliere) {
      setSelectedFiliere(foundFiliere);
      const foundModule = foundFiliere.modules.find(
        (m) => m.moduleId === parseInt(moduleId)
      );
      setSelectedModule(foundModule);
    }
  }, [filiere, filiereId, moduleId]);

  // Toggle drawer
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  // Open video or PDF
  const openVideo = useCallback((url) => {
    setSelectedVideo(url);
    setSelectedPDF(null);
  }, []);

  const openPDF = useCallback((url) => {
    setSelectedPDF(url);
    setSelectedVideo(null);
  }, []);

  if (!selectedFiliere || !selectedModule) {
    return (
      <Container>
        <Typography variant="h5" color="textSecondary">
          Module introuvable.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          pt: "10px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            {selectedModule.name} - {selectedFiliere.nomFiliere}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for module elements */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{ width: drawerOpen ? drawerWidth : 0, flexShrink: 0 }}
      >
        <Toolbar />
        <List sx={{ mt: "10px" }}>
          {["courses", "TD", "TP", "EXAMS"].map((category) => (
            <Accordion key={category}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`${category}-content`}
                id={`${category}-header`}
              >
                <Typography>{category.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {selectedModule[category]?.map((item, index) => (
                    <ListItem key={`${category}-${index}`}>
                      <ListItemIcon>
                        {item.type === "pdf" ? (
                          <PictureAsPdf />
                        ) : (
                          <PlayCircleOutline />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        onClick={() =>
                          item.type === "pdf"
                            ? openPDF(item.url)
                            : openVideo(item.url)
                        }
                        sx={{ cursor: "pointer" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Drawer>

      {/* Main content for video/PDF viewer */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
          width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
        }}
      >
        <Toolbar />
        {selectedVideo ? (
          <VideoPlayer url={selectedVideo} />
        ) : selectedPDF ? (
          <PDFViewer url={selectedPDF} />
        ) : (
          <Typography paragraph>
            Cliquez sur une vidéo ou un PDF dans le tiroir pour voir son
            contenu.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
