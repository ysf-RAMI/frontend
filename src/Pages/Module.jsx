import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
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
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Menu,
  PictureAsPdf,
  PlayCircleOutline,
  Home as HomeIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import VideoPlayer from "../Components/Videos";
import PDFViewer from "../Components/PDFViewer";

const drawerWidth = 300;

function useModuleData(filiereId, filiere) {
  const [selectedFiliere, setSelectedFiliere] = useState(
    filiere.find((f) => f.filiereId === parseInt(filiereId)) || filiere[0]
  );
  const [selectedModule, setSelectedModule] = useState(
    selectedFiliere.modules[0]
  );

  useEffect(() => {
    setSelectedModule(selectedFiliere.modules[0]);
  }, [selectedFiliere]);

  return {
    selectedFiliere,
    setSelectedFiliere,
    selectedModule,
    setSelectedModule,
  };
}

function ModuleDrawer({ selectedModule, openVideo, openPDF }) {
  return (
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
  );
}

function Module() {
  const { filiereId } = useParams();
  const { filiere } = useContext(moduleContext);
  const {
    selectedFiliere,
    setSelectedFiliere,
    selectedModule,
    setSelectedModule,
  } = useModuleData(filiereId, filiere);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const openVideo = useCallback((url) => {
    setSelectedVideo(url);
    setSelectedPDF(null);
  }, []);
  const openPDF = useCallback((url) => {
    setSelectedPDF(url);
    setSelectedVideo(null);
  }, []);

  const handleFiliereChange = useCallback(
    (event, newValue) => {
      if (newValue) {
        setSelectedFiliere(newValue);
      }
    },
    [filiere]
  );

  const handleModuleChange = useCallback(
    (event, newValue) => {
      if (newValue) {
        setSelectedModule(newValue);
      }
    },
    [selectedFiliere]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
      
        position="fixed"
        sx={{ color:"white",bgcolor:"",zIndex: (theme) => theme.zIndex.drawer + 1, pt: "10px" }}
      >
        <Toolbar>
          <IconButton 
            color="inherit"
            edge="start"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Autocomplete
              value={selectedFiliere}
              onChange={handleFiliereChange}
              options={filiere}
              getOptionLabel={(option) => option.nomFiliere}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sélectionner une Filière"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              value={selectedModule}
              onChange={handleModuleChange}
              options={selectedFiliere.modules}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Sélectionner un Module"
                  variant="outlined"
                />
              )}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{ width: drawerOpen ? drawerWidth : 0, flexShrink: 0 }}
      >
        <Toolbar />
        <ModuleDrawer
          selectedModule={selectedModule}
          openVideo={openVideo}
          openPDF={openPDF}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          
          flexGrow: 1,
          p: 3,
          marginLeft:"80px",
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

export default Module;
