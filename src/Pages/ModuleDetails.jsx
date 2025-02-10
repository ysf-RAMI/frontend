import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moduleContext } from "../Context/ModuleContext";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import {
  PictureAsPdf,
  PlayCircleOutline,
  ArrowDropDown as ArrowDropDownIcon,
  Fullscreen,
  FullscreenExit,
  YouTube,
} from "@mui/icons-material";
import { Document, Page } from "react-pdf"; // Use React-PDF for better scaling
import VideoPlayer from "../Components/Videos";
import { NotFound } from "./NotFound";

export default function ModuleDetails() {
  const { filiereId, moduleId } = useParams(); // Retrieve filiereId and moduleId from URL
  const { filiere } = useContext(moduleContext);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen mode state
  const [scale, setScale] = useState(1.5); // Default scale to make the PDF larger
  const [numPages, setNumPages] = useState(null); // Total number of pages in the PDF
  const [pageNumber, setPageNumber] = useState(1); // Current page number

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

  // Open video or PDF
  const openVideo = (url) => {
    setSelectedVideo(url);
    setSelectedPDF(null);
  };

  const openPDF = (url) => {
    setSelectedPDF(url);
    setSelectedVideo(null);
  };

  // Download PDF
  const downloadPDF = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name || "document.pdf";
    link.click();
  };

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Handle PDF load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!selectedFiliere || !selectedModule) {
    return <NotFound />;
  }

  return (
    <Container sx={{ marginTop: "80px", marginBottom: "30px" }}>
      {/* Module Title */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {selectedModule.name} - {selectedFiliere.nomFiliere}
      </Typography>

      {/* Video/PDF Viewer */}
      <Box
        sx={{
          mb: 4,
          width: "100%",
          height: isFullScreen ? "100vh" : "800px", // Increased height
          maxWidth: "100%", // Allow the PDF to take up the full width
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: isFullScreen ? "fixed" : "static",
          top: isFullScreen ? 0 : "auto",
          left: isFullScreen ? 0 : "auto",
          zIndex: isFullScreen ? 9999 : 1,
        }}
      >
        {/* Full-Screen Toggle Button */}
        <IconButton
          onClick={toggleFullScreen}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>

        {selectedVideo ? (
          <>
            {/* YouTube Video Integration */}
            {selectedVideo.includes("youtube.com") ||
            selectedVideo.includes("youtu.be") ? (
              <iframe
                width="100%"
                height={isFullScreen ? "100%" : "400px"}
                src={selectedVideo.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <VideoPlayer url={selectedVideo} />
            )}
          </>
        ) : selectedPDF ? (
          <>
            {/* PDF Viewer with React-PDF */}
            <Document file={selectedPDF} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} />{" "}
              {/* Adjust scale for size */}
            </Document>
            {/* Zoom Controls */}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button onClick={() => setScale(scale + 0.1)}>Zoom In</Button>
              <Button onClick={() => setScale(scale - 0.1)}>Zoom Out</Button>
            </Box>
            {/* Download PDF Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
              onClick={() => downloadPDF(selectedPDF, selectedModule.name)}
            >
              Download PDF
            </Button>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Select a video or PDF below to view its content.
          </Typography>
        )}
      </Box>

      {/* Module Content (Courses, TD, TP, Exams) */}
      <Box sx={{ mt: 4 }}>
        {["courses", "TD", "TP", "EXAMS"].map((category) => (
          <Accordion key={category} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h6">{category.toUpperCase()}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: "300px", // Constrain height for long lists
                overflowY: "auto", // Enable scrolling
              }}
            >
              <List>
                {selectedModule[category]?.map((item, index) => (
                  <ListItem
                    key={`${category}-${index}`}
                    button
                    onClick={() =>
                      item.type === "pdf"
                        ? openPDF(item.url)
                        : openVideo(item.url)
                    }
                    sx={{ borderRadius: 1, mb: 1 }}
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
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
