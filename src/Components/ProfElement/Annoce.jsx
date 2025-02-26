import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import img from "../../assets/54c27441-ad21-4af6-bd47-43568a499f29.png";

export default function Annonce() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Genie informatique",
      description: "description",
      professor: {
        name: "hamza hamout",
      },
      date: "2024-03-01",
    },
    // Add more sample data if needed
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (announcement = null) => {
    setCurrentAnnouncement(announcement);
    setIsEditing(!!announcement);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAnnouncement(null);
    setIsEditing(false);
  };

  const handleSaveAnnouncement = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAnnouncement = {
      id: isEditing ? currentAnnouncement.id : Date.now(),
      title: formData.get("title"),
      description: formData.get("description"),
      professor: {
        name: formData.get("professorName"),
      },
      date: new Date().toISOString().split("T")[0],
    };

    if (isEditing) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === newAnnouncement.id ? newAnnouncement : a))
      );
    } else {
      setAnnouncements((prev) => [...prev, newAnnouncement]);
    }
    handleCloseDialog();
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="xl">
        <Row className="mb-5">
          <Col>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                }}
              >
                Les announcements
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Add Announcement
              </Button>
            </Box>
          </Col>
        </Row>

        <Grid container spacing={4}>
          {announcements.map((announcement, index) => (
            <Grid item xs={12} md={4} key={announcement.id}>
              <Card
                onMouseEnter={() => setHoveredCard(announcement.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={img}
                  alt={announcement.title}
                  sx={{
                    transition: "transform 0.3s ease",
                    ...(hoveredCard === announcement.id && {
                      transform: "scale(1.05)",
                    }),
                  }}
                />
                <CardContent
                  sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: "auto" }}
                    >
                      <AccessTimeIcon
                        sx={{
                          fontSize: "0.875rem",
                          mr: 0.5,
                          color: "text.secondary",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(announcement.date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, fontSize: "1.25rem", mb: 2 }}
                  >
                    {announcement.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {announcement.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      alt={announcement.professor.name}
                      sx={{
                        mr: 2,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {announcement.professor.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton onClick={() => handleOpenDialog(announcement)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Announcement Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {isEditing ? "Edit Announcement" : "Add Announcement"}
          </DialogTitle>
          <DialogContent>
            <form id="announcement-form" onSubmit={handleSaveAnnouncement}>
              <TextField
                name="title"
                label="Title"
                defaultValue={currentAnnouncement?.title || ""}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="description"
                label="Description"
                defaultValue={currentAnnouncement?.description || ""}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="professorName"
                label="Professor Name"
                defaultValue={currentAnnouncement?.professor.name || ""}
                fullWidth
                margin="normal"
                required
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" form="announcement-form">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
