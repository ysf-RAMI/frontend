import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import moduleContext from "../Context/ModuleContext";
import {
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import {
  PictureAsPdf,
  PlayCircleOutline,
  Menu,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import VideoPlayer from "../Components/Videos";
import { NotFound } from "./NotFound";

export default function ModuleDetails() {
  const { filiereId, moduleId } = useParams();
  const { filiere } = useContext(moduleContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(1.5);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const openContent = (item) => {
    setSelectedContent(item);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!selectedModule) {
    return <NotFound />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{ width: 300, flexShrink: 0 }}
      >
        <Box sx={{ width: 300, paddingTop: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            {selectedModule.name}
          </Typography>
          <Divider />
          {["courses", "TD", "TP", "EXAMS"].map((category) => (
            <List key={category}>
              <Typography variant="subtitle1" sx={{ pl: 2 }}>
                {category.toUpperCase()}
              </Typography>
              {selectedModule[category]?.map((item, index) => (
                <ListItem
                  key={`${category}-${index}`}
                  button
                  onClick={() => openContent(item)}
                >
                  <ListItemIcon>
                    {item.type === "pdf" ? (
                      <PictureAsPdf />
                    ) : (
                      <PlayCircleOutline />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          ))}
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-start" }}>
          <Menu />
        </IconButton>

        {selectedContent ? (
          <Box
            sx={{
              width: "100%",
              height: isFullScreen ? "100vh" : "600px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              position: isFullScreen ? "fixed" : "static",
              top: isFullScreen ? 0 : "auto",
              left: isFullScreen ? 0 : "auto",
              zIndex: isFullScreen ? 9999 : 1,
            }}
          >
            <IconButton
              onClick={toggleFullScreen}
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>

            {selectedContent.type === "video" ? (
              <VideoPlayer url={selectedContent.url} />
            ) : (
              <Document
                file={selectedContent.url}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            )}
          </Box>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Sélectionnez un contenu à afficher
          </Typography>
        )}
      </Box>
    </Box>
  );
}
