import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  DialogContentText,
  Grid,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
  Warning,
  Cancel,
  Save,
  Email,
  Edit,
  Key,
  AccountCircle,
} from "@mui/icons-material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/image-Photoroom.jpg";
import {jwtDecode} from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "react-bootstrap";

// Custom hook for form validation
const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);

    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
};

const Profile = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth")) || {};
  const token = auth.token;
  const profId = localStorage.getItem("profId");
  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";


  const themeColors = {
    primary: "#003366",
    secondary: "#01162e",
    white: "#ffffff",
    lightBlue: "#e6eef5",
    midBlue: "#0055a4",
  };

  
  const [isLoading, setIsLoading] = useState(true);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const validateProfile = (values) => {
    let errors = {};

    if (!values.nom) {
      errors.nom = "Last name is required";
    }

    if (!values.prenom) {
      errors.prenom = "First name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  };

  const validatePassword = (values) => {
    let errors = {};

    if (!values.oldPassword) {
      errors.oldPassword = "Current password is required";
    }

    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  
  const {
    values: profileValues,
    errors: profileErrors,
    handleChange: handleProfileChange,
    handleBlur: handleProfileBlur,
    handleSubmit: handleProfileSubmit,
    setValues: setProfileValues,
  } = useFormValidation(
    {
      nom: "",
      prenom: "",
      email: "",
    },
    validateProfile
  );

  const {
    values: passwordValues,
    errors: passwordErrors,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    handleSubmit: handlePasswordSubmit,
  } = useFormValidation(
    {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validatePassword
  );

  
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      easing: "ease-in-out",
    });

    
    fetchProfileData();
  }, [navigate, token]);

  const fetchProfileData = async () => {

    const decode = jwtDecode(token);
    const email = decode.sub;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/professeur/getProfil/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const { nom, prenom, email } = response.data;
        setProfileValues({ nom, prenom, email });
      }
    } catch (error) {
      console.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  
  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/professeur/ModifierProfil`,
        {
          id: profId,
          nom: profileValues.nom,
          prenom: profileValues.prenom,
          email: profileValues.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setIsEditProfileModalOpen(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("profId");
      }
    } catch (error) {
      toast.error("Failed to update profile", error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/professeur/updatePassword`,
        {
          id: profId,
          oldPassword: passwordValues.oldPassword,
          newPassword: passwordValues.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setIsChangePasswordModalOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update password");
    }
  };




  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: themeColors.secondary,
          color: themeColors.white,
        }}
      >
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "0",
        margin: "0",
        overflow: "hidden",
        marginTop: "-50px",
      }}
    >
      <ToastContainer
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
        newestOnTop={true}
        closeButton={false}
        enableMultiContainer={true}
        position="top-center"
        zIndex={9999}
      />
      <Paper
        elevation={10}
        sx={{
          width: "90%",
          height: "90vh",
          maxWidth: "1400px",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: "auto",
        }}
        data-aos="fade-up"
      >
        {/* Profile Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            backgroundColor: themeColors.secondary,
            color: themeColors.white,
            padding: "60px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.05,
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E\')',
              backgroundSize: "80px 80px",
              zIndex: 0,
            }}
          />

          <Avatar
            alt={profileValues.prenom}
            src={logo}
            sx={{
              width: 180,
              height: 180,
              border: `4px solid ${themeColors.white}`,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              mb: 4,
              zIndex: 1,
            }}
          >
            {profileValues.prenom ? profileValues.prenom[0] : "U"}
          </Avatar>

          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, zIndex: 1 }}>
            Dr.{profileValues.nom.toUpperCase()} {profileValues.prenom}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              opacity: 0.9,
              display: "flex",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Email sx={{ mr: 1, fontSize: 20 }} /> {profileValues.email}
          </Typography>

          <Divider
            sx={{
              width: "60%",
              backgroundColor: "rgba(255,255,255,0.2)",
              my: 4,
            }}
          />

          <Box sx={{ mt: 2, textAlign: "center", zIndex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, opacity: 0.7 }}>
              Professor ID: {profId}
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: "30px", md: "60px" },
            backgroundColor: themeColors.white,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: themeColors.primary, mb: 4 }}
            >
              Professeur Information
            </Typography>

            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Prenom
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: themeColors.secondary }}
                >
                  {profileValues.prenom}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Nom
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: themeColors.secondary }}
                >
                  {profileValues.nom}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Email
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: themeColors.secondary }}
                >
                  {profileValues.email}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Le titre academique
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: themeColors.secondary }}
                >
                  Professeur
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Divider sx={{ my: 4 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Tooltip title="Edit your profile information" arrow>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Edit />}
                    onClick={() => setIsEditProfileModalOpen(true)}
                    sx={{
                      backgroundColor: themeColors.primary,
                      color: themeColors.white,
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 500,
                      boxShadow: "0 4px 12px rgba(0, 51, 102, 0.2)",
                      "&:hover": {
                        backgroundColor: themeColors.midBlue,
                      },
                    }}
                  >
                    Modifier Profil
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={12} md={6}>
                <Tooltip title="Change your account password" arrow>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<Key />}
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    sx={{
                      borderColor: themeColors.primary,
                      color: themeColors.primary,
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: themeColors.midBlue,
                        backgroundColor: "rgba(0, 51, 102, 0.04)",
                      },
                    }}
                  >
                    Changer Mot de Passe
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      {/* Edit Profile Modal */}
      <Dialog
        open={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: themeColors.primary,
            color: themeColors.white,
            display: "flex",
            alignItems: "center",
            py: 2.5,
          }}
        >
          <AccountCircle sx={{ mr: 1 }} /> Edit Profile Information
        </DialogTitle>

        <form onSubmit={handleProfileSubmit(updateProfile)}>
          <DialogContent sx={{ pt: 3 }}>
            <DialogContentText
              sx={{ mb: 3, display: "flex", alignItems: "center" }}
            >
              <Warning color="warning" sx={{ mr: 1 }} />
              You may be required to log in again after profile changes.
            </DialogContentText>

            <TextField
              fullWidth
              name="nom"
              label="Last Name"
              value={profileValues.nom}
              onChange={handleProfileChange}
              onBlur={handleProfileBlur}
              error={!!profileErrors.nom}
              helperText={profileErrors.nom}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
            />

            <TextField
              fullWidth
              name="prenom"
              label="First Name"
              value={profileValues.prenom}
              onChange={handleProfileChange}
              onBlur={handleProfileBlur}
              error={!!profileErrors.prenom}
              helperText={profileErrors.prenom}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
            />

            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={profileValues.email}
              onChange={handleProfileChange}
              onBlur={handleProfileBlur}
              error={!!profileErrors.email}
              helperText={profileErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setIsEditProfileModalOpen(false)}
              startIcon={<Cancel />}
              sx={{
                borderColor: "#666",
                color: "#666",
                "&:hover": {
                  borderColor: "#333",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              startIcon={<Save />}
              sx={{
                backgroundColor: themeColors.primary,
                color: themeColors.white,
                "&:hover": {
                  backgroundColor: themeColors.midBlue,
                },
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: themeColors.primary,
            color: themeColors.white,
            display: "flex",
            alignItems: "center",
            py: 2.5,
          }}
        >
          <Lock sx={{ mr: 1 }} /> Change Password
        </DialogTitle>

        <form onSubmit={handlePasswordSubmit(updatePassword)}>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              name="oldPassword"
              label="Current Password"
              type={showOldPassword ? "text" : "password"}
              value={passwordValues.oldPassword}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={!!passwordErrors.oldPassword}
              helperText={passwordErrors.oldPassword}
              sx={{
                mb: 3,
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("oldPassword")}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="newPassword"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={passwordValues.newPassword}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={!!passwordErrors.newPassword}
              helperText={passwordErrors.newPassword}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility("newPassword")}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={passwordValues.confirmPassword}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={!!passwordErrors.confirmPassword}
              helperText={passwordErrors.confirmPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeColors.primary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setIsChangePasswordModalOpen(false)}
              startIcon={<Cancel />}
              sx={{
                borderColor: "#666",
                color: "#666",
                "&:hover": {
                  borderColor: "#333",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              startIcon={<Lock />}
              sx={{
                backgroundColor: themeColors.primary,
                color: themeColors.white,
                "&:hover": {
                  backgroundColor: themeColors.midBlue,
                },
              }}
            >
              Update Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Profile;
