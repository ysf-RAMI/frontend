import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
  Avatar,
  useTheme, // Import useTheme
} from "@mui/material";
import user from "../assets/pic-1.jpg";

const Profile = () => {
  const theme = useTheme(); // Access the current theme
  const [userInfo, setUserInfo] = useState({
    firstName: "Youssef",
    lastName: "RAMI",
    email: "youssef@rami.com",
    phoneNumber: "(123) 456-7890",
    city: "New York",
    country: "America",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log("Updated User Info:", userInfo);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default, // Use theme-aware background
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper, // Use theme-aware background
          }}
        >
          {/* Left Side: User Info */}
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Avatar
              src={user}
              alt="User"
              sx={{ width: "100px", height: "100px", mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: theme.palette.text.primary,
              }} // Use theme-aware text color
            >
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, color: theme.palette.text.secondary }} // Use theme-aware text color
            >
              {userInfo.email}
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }} // Use theme-aware text color
            >
              Filière: Génie Informatique
            </Typography>
          </Box>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { xs: 0, md: 3 }, my: { xs: 3, md: 0 } }}
          />

          {/* Right Side: Edit Profile Form */}
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: theme.palette.text.primary,
              }} // Use theme-aware text color
            >
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main, // Use theme-aware primary color
                  color: theme.palette.primary.contrastText, // Use theme-aware contrast text color
                  "&:hover": { backgroundColor: theme.palette.primary.dark }, // Use theme-aware hover color
                }}
              >
                Save Changes
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
  