import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  useTheme,
  IconButton,
  Alert,
  Snackbar,
  Divider,
  Grid,
} from "@mui/material";
import { PhotoCamera, Edit } from "@mui/icons-material";

const Profile = () => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  const [professorInfo, setProfessorInfo] = useState({
    name: "Dr. Youssef RAMI",
    module: "Genie informatique",
    university: "Estg",
    email: "youssef.rami@gmail.com",
    description: "descortion dyal lostad",
  });

  const [profileImage, setProfileImage] = useState("/api/placeholder/150/150");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessorInfo({ ...professorInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setShowAlert(true);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "20px",
        marginTop: "70px", // Adjusting for the navbar
        fontFamily: "Open Sans, sans-serif", // Apply Open Sans font globally
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ borderRadius: "16px", overflow: "hidden" }}>
          <Grid container spacing={2}>
            {/* Left Column - Profile Display */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRight: { md: `1px solid ${theme.palette.divider}` },
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={profileImage}
                  alt="Rami"
                  sx={{
                    width: 180,
                    height: 180,
                    border: "3px solid",
                    borderColor: theme.palette.primary.main,
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: theme.shadows[2],
                    "&:hover": { backgroundColor: theme.palette.grey[100] },
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <PhotoCamera />
                </IconButton>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}
              >
                {professorInfo.name}
              </Typography>

              <Typography
                variant="body1"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                {professorInfo.module}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {professorInfo.university}
              </Typography>

              <Box sx={{ width: "100%", mt: 2 ,textAlign:"center"}}>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Email:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {professorInfo.email}
                </Typography>
              </Box>

              <Box sx={{ width: "100%" ,textAlign:"center"}}>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Description:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {professorInfo.description}
                </Typography>
              </Box>
            </Grid>

            {/* Right Column - Edit Form */}
            <Grid item xs={12} md={8} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Update Profile Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={professorInfo.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Module/Course"
                  name="module"
                  value={professorInfo.module}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="University"
                  name="university"
                  value={professorInfo.university}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={professorInfo.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={professorInfo.description}
                  onChange={handleChange}
                  sx={{ mb: 4 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Edit />}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
