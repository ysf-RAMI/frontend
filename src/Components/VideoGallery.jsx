import React from "react";
import { Card, Button, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useState } from "react";

const VideoGallery = () => {
  const [open, setOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "Lecture 1 - Introduction",
      videoUrl: "https://www.youtube.com/watch?v=n65zFfl9dqA",
    },
    {
      id: 2,
      title: "Lecture 2 - Advanced Topics",
      videoUrl: "https://www.youtube.com/watch?v=n65zFfl9dqA",
    },

  ];

  const handleVideoClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          backgroundColor: "#f4f4f9",
        }}
      >
        <Typography variant="h3" sx={{ color: "#5a189a", marginBottom: 4 }}>
          Course Video Gallery
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <Typography variant="h5" sx={{ color: "#5a189a" }}>
                  {video.title}
                </Typography>
                <IconButton
                  onClick={() => handleVideoClick(video.videoUrl)}
                  sx={{
                    color: "#5a189a",
                    fontSize: 50,
                    marginTop: 2,
                  }}
                >
                  <PlayCircleOutlineIcon fontSize="inherit" />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            textAlign: "center",
          }}
        >
          {currentVideo && (
            <iframe
              width="100%"
              height="500px"
              src={`https://www.youtube.com/embed/${new URL(
                currentVideo
              ).searchParams.get("v")}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#5a189a",
              color: "#fff",
              ":hover": { bgcolor: "#3c096c" },
            }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default VideoGallery;
