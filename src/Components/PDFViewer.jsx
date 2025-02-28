import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

const PdfViewer = ({ lien }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // Store the PDF URL

  // Fetch the PDF file from the backend
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/files/getFile/${lien}`,
          {
            responseType: "blob", // Fetch as a binary blob
          }
        );

        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Generate a URL for the Blob
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // Store the URL in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setError("Failed to load PDF. Please try downloading instead.");
        setLoading(false);
      }
    };

    fetchPdf();
  }, [lien]);

  // Handle download
  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = lien; // Use the file name as the download name
      link.click();
      URL.revokeObjectURL(pdfUrl); // Clean up the object URL
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error ? (
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              border: "1px solid #ddd",
              borderRadius: 1,
              mb: 2,
              overflow: "hidden",
            }}
          >
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="PDF Viewer"
              />
            )}
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </>
      )}
    </Box>
  );
};

export default PdfViewer;
