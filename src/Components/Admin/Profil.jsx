import React, { useState, useRef, useEffect } from "react";
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
import { PhotoCamera, Edit, Lock, Person } from "@mui/icons-material";
import profileImage from "../assets/image-Photoroom.jpg";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/professeur";
const token = JSON.parse(localStorage.getItem("auth"))?.token;
const profId = localStorage.getItem("profId");

const Profil = () => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassoword] = useState({});

  const [professorInfo, setProfessorInfo] = useState({
    name: "RAMI",
    prenom: "Youssef",
    email: "youssef.rami@gmail.com",
  });

  const [profPassword, setProfPassword] = useState("");
  const handleChangePasswordClick = (id) => {
    setOpenChangePassword(true);
  };

  const handleChangePasswordAgree = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/updatePassword`,
        {
          id: profId,
          oldPassowrd: oldPassowrd,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Mot de passe modifié avec succès");
      handleClose();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Erreur lors de la modification du mot de passe");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessorInfo({ ...professorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    axios.post(`${baseUrl}/ModifierProfil`),
      {
        id: profId,
        nom: nom,
        prenom: prenom,
        email: email,
      }
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Box sx={{ position: "relat ive" }}>
                <Avatar
                  src={profileImage}
                  alt="rami"
                  sx={{
                    width: 180,
                    height: 180,
                    border: "3px solid",
                    borderColor: theme.palette.primary.main,
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}
              >
                Dr.{professorInfo.prenom} {professorInfo.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {professorInfo.email}
              </Typography>
            </Grid>

            {/* Right Column - Edit Form */}
            <Grid item xs={12} md={8} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Update Profile Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  value={professorInfo.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Prenom"
                  name="prenom"
                  type="email"
                  value={professorInfo.prenom}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={professorInfo.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  startIcon={<Person />}
                >
                  Save Changes
                </Button>
                <TextField
                  fullWidth
                  label="Old Password"
                  name="description"
                  value={professorInfo.description}
                  onChange={handleChange}
                  sx={{ mb: 1, mt: 1 }}
                />{" "}
                <TextField
                  fullWidth
                  label="New Password"
                  name="description"
                  value={professorInfo.description}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />{" "}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="description"
                  value={professorInfo.description}
                  onChange={handleChange}
                  sx={{ mb: 1 }}
                />
                <Button type="submit" variant="outlined" startIcon={<Lock />}>
                  Change Password
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profil;
