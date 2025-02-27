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
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff, Dangerous, Cancel, CancelScheduleSendSharp, Save, SaveSharp, DangerousTwoTone, Email } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS for animations
import logo from "../../assets/image-Photoroom.jpg";

const auth = JSON.parse(localStorage.getItem("auth"));
const token = auth ? auth.token : null;
const profId = localStorage.getItem("profId");
const baseUrl = "http://localhost:8080/api/professeur";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(token);

    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  // State for professor information
  const [professorInfo, setProfessorInfo] = useState({
    nom: "Rami",
    prenom: "Youssef",
    email: "ramiyoussef@gmail.com",
  });

  // State for password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // State for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for modals
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Redirect to login if token is not present

  // Handle profile information update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `${baseUrl}/ModifierProfil`,
        {
          id: profId,
          nom: professorInfo.nom,
          prenom: professorInfo.prenom,
          email: professorInfo.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Profile updated successfully!");
          setIsEditProfileModalOpen(false);
        }
      })
      .catch((err) => {
        console.error("Profile Update Error:", err);
        toast.error("Failed to update profile");
      });
  };

  // Handle password update
  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .put(
        `${baseUrl}/updatePassword`,
        {
          id: profId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Password updated successfully!");
          setIsChangePasswordModalOpen(false);
        }
      })
      .catch((err) => {
        console.error("Password Update Error:", err);
        toast.error("Failed to update password");
      });
  };

  // Toggle password visibility
  const handleClickShowPassword = (field) => {
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

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg,rgba(121, 121, 121, 0),rgba(0, 0, 0, 0.04))",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        borderRadius: "16px",
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
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
        data-aos="fade-up"
      >
        <Avatar
          alt={professorInfo.prenom}
          src={logo}
          sx={{
            width: 280,
            height: 270,
            borderRadius: "50%",
            border: "4px solid #6a11cb",
            boxShadow: "0 4px 20px rgba(0, 15, 127, 0.46)",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "20px",

            margin: "0 auto 20px",
            fontSize: "48px",
          }}
        >
          {professorInfo.prenom[0]}
        </Avatar>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Dr. {professorInfo.prenom} {professorInfo.nom}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          <Email /> {professorInfo.email}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Person />}
          onClick={() => setIsEditProfileModalOpen(true)}
        >
          Edit Profile
        </Button>

        <Button
          variant="outlined"
          startIcon={<Lock />}
          onClick={() => setIsChangePasswordModalOpen(true)}
          color="secondary"
          sx={{ ml: 2 }}
        >
          Change Password
        </Button>
      </Container>

      {/* Edit Profile Modal */}
      <Dialog
        open={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      >
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent>
          <DialogContentText color="error">
            <DangerousTwoTone /> If you edit your profile, you will be logged
            out ..!
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom"
            value={professorInfo.nom}
            onChange={(e) =>
              setProfessorInfo({ ...professorInfo, nom: e.target.value })
            }
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            label="Prenom"
            value={professorInfo.prenom}
            onChange={(e) =>
              setProfessorInfo({ ...professorInfo, prenom: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={professorInfo.email}
            onChange={(e) =>
              setProfessorInfo({ ...professorInfo, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setIsEditProfileModalOpen(false)}
          >
            <CancelScheduleSendSharp />
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleProfileUpdate}
            color="secondary"
          >
            <SaveSharp />
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ mb: 2, mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("oldPassword")}
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
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("newPassword")}
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
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
            error={passwordMatchError}
            helperText={passwordMatchError ? "Passwords do not match" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setIsChangePasswordModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handlePasswordUpdate}
            color="secondary"
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
