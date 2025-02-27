import { useState, useEffect } from "react";
import {
  Box,
  Container,
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
  Fade,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Person,
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/image-Photoroom.jpg";

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
  const baseUrl = "http://localhost:8080/api/professeur";

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form validation functions
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

  // Custom form hooks
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

  // Authentication check and data fetching
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Initialize animations
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      easing: "ease-in-out",
    });

    // Fetch user profile data
    fetchProfileData();
  }, [navigate, token]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/profile/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { nom, prenom, email } = response.data;
        setProfileValues({ nom, prenom, email });
      }
    } catch (error) {
      handleApiError("Failed to load profile data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // API interaction functions
  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/ModifierProfil`,
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
        showSnackbar("Profile updated successfully!", "success");
        setIsEditProfileModalOpen(false);
        // Optionally log out the user if required
        // setTimeout(() => { localStorage.clear(); navigate("/login"); }, 3000);
      }
    } catch (error) {
      handleApiError("Failed to update profile", error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/updatePassword`,
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
        showSnackbar("Password updated successfully!", "success");
        setIsChangePasswordModalOpen(false);
      }
    } catch (error) {
      handleApiError("Failed to update password", error);
    }
  };

  // Helper functions
  const handleApiError = (message, error) => {
    console.error(`${message}:`, error);
    let errorMsg = message;

    if (error.response) {
      errorMsg = error.response.data.message || errorMsg;
    }

    showSnackbar(errorMsg, "error");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
        }}
      >
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <ToastContainer
        autoClose={2500}
        position="top-center"
        closeOnClick
        newestOnTop
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Paper
        elevation={8}
        sx={{
          maxWidth: "800px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        data-aos="fade-up"
      >
        <Grid container>
          {/* Profile Sidebar */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "white",
              padding: "40px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt={profileValues.prenom}
              src={logo}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid white",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                mb: 3,
              }}
            >
              {profileValues.prenom ? profileValues.prenom[0] : "U"}
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Dr. {profileValues.prenom} {profileValues.nom}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 3,
                opacity: 0.8,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Email sx={{ mr: 1, fontSize: 16 }} /> {profileValues.email}
            </Typography>

            <Divider
              sx={{
                width: "80%",
                backgroundColor: "rgba(255,255,255,0.2)",
                my: 2,
              }}
            />

            <Typography variant="subtitle2" sx={{ mb: 1, mt: 2, opacity: 0.7 }}>
              Professor ID: {profId}
            </Typography>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8} sx={{ padding: "40px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "#333", mb: 4 }}
            >
              Profile Information
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  First Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {profileValues.prenom}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {profileValues.nom}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {profileValues.email}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Edit your profile information" arrow>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Edit />}
                    onClick={() => setIsEditProfileModalOpen(true)}
                    sx={{
                      background: "linear-gradient(to right, #2575fc, #6a11cb)",
                      textTransform: "none",
                      py: 1,
                      boxShadow: "0 4px 12px rgba(37, 117, 252, 0.2)",
                    }}
                  >
                    Edit Profile
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Change your account password" arrow>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Key />}
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    sx={{
                      borderColor: "#6a11cb",
                      color: "#6a11cb",
                      textTransform: "none",
                      py: 1,
                      "&:hover": {
                        borderColor: "#2575fc",
                        backgroundColor: "rgba(37, 117, 252, 0.04)",
                      },
                    }}
                  >
                    Change Password
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Edit Profile Modal */}
      <Dialog
        open={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right, #2575fc, #6a11cb)",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccountCircle sx={{ mr: 1 }} /> Edit Profile Information
        </DialogTitle>

        <form onSubmit={handleProfileSubmit(updateProfile)}>
          <DialogContent>
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
              sx={{ mb: 3 }}
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
              sx={{ mb: 3 }}
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
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setIsEditProfileModalOpen(false)}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              startIcon={<Save />}
              sx={{
                background: "linear-gradient(to right, #2575fc, #6a11cb)",
                boxShadow: "0 4px 12px rgba(37, 117, 252, 0.2)",
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
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right, #2575fc, #6a11cb)",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Lock sx={{ mr: 1 }} /> Change Password
        </DialogTitle>

        <form onSubmit={handlePasswordSubmit(updatePassword)}>
          <DialogContent>
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
              sx={{ mb: 3, mt: 1 }}
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
              sx={{ mb: 3 }}
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
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              startIcon={<Lock />}
              sx={{
                background: "linear-gradient(to right, #2575fc, #6a11cb)",
                boxShadow: "0 4px 12px rgba(37, 117, 252, 0.2)",
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