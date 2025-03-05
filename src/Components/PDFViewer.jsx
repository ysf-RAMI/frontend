import  { useRef } from "react";
import { Box, Button,  IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

// eslint-disable-next-line react/prop-types
const PdfViewer = ({ lien }) => {
  const iframeRef = useRef(null);

  const toggleFullScreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          border: "1px solid #ddd",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IconButton
          onClick={toggleFullScreen}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
        >
          {document.fullscreenElement ? (
            <FullscreenExitIcon />
          ) : (
            <FullscreenIcon />
          )}
        </IconButton>
        <iframe
          ref={iframeRef}
          src={`http://localhost:8080/api/files/getFile/${lien}#toolbar=0`} 
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        />

        {/* Full-Screen Button */}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        href={`http://localhost:8080/api/files/getFile/${lien}`}
        download
        startIcon={<i className="fas fa-download" />}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default PdfViewer;
