import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import "../styles/Profile.css";
import user from "../assets/pic-1.jpg";

const Profile = () => {
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
    <div className="userProfile">
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "20px",
          backgroundColor: "rgba(169, 169, 169, 0.8)",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "rgb(0, 108, 113)",
          }}
        >
          <img
            src={user}
            alt="User"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <Typography variant="h5" sx={{ marginTop: "10px" }}>
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Typography variant="body1">{userInfo.email}</Typography>
          <Divider sx={{ width: "100%", margin: "20px 0" }} />
          <Typography variant="body1">filiere: Genie Informatique </Typography>
        </Box>
        <Divider orientation="vertical" flexItem style={{ padding: "15px" }} />
        <Box
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            color: "rgb(0, 108, 113)",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              sx={{ marginBottom: "20px" }}
            />

            <Button type="submit" variant="outlined" color="primary ">
              Save Changes
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
