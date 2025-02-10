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
} from "@mui/material";
import {
  PictureAsPdf,
  PlayCircleOutline,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import VideoPlayer from "../Components/Videos";
import PDFViewer from "../Components/PDFViewer";
import { NotFound } from "./NotFound";

export default function ModuleDetails() {
  const { filiereId, moduleId } = useParams(); // Retrieve filiereId and moduleId from URL
  const { filiere } = useContext(moduleContext);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
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

  // Open video or PDF
  const openVideo = (url) => {
    setSelectedVideo(url);
    setSelectedPDF(null);
  };

  const openPDF = (url) => {
    setSelectedPDF(url);
    setSelectedVideo(null);
  };

  if (!selectedFiliere || !selectedModule) {
    return <NotFound />;
  }

  return (
    <Container sx={{ marginTop:"130px" }}>
      {/* Module Title */}
      <Typography variant="h4" gutterBottom>
        {selectedModule.name} - {selectedFiliere.nomFiliere}
      </Typography>

      {/* Video/PDF Viewer */}
      <Box sx={{ mb: 4 }}>
        {selectedVideo ? (
          <VideoPlayer url={selectedVideo} />
        ) : selectedPDF ? (
          <PDFViewer url={selectedPDF} />
        ) : (
          <Typography variant="h6" color="textSecondary">
            Select a video or PDF below to view its content.
          </Typography>
        )}
      </Box>

      {/* Module Content (Courses, TD, TP, Exams) */}
      {["courses", "TD", "TP", "EXAMS"].map((category) => (
        <Accordion key={category} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography variant="h6">{category.toUpperCase()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
    </Container>
  );
}
