import { useState, useEffect, useContext } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
  Typography,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import userImage from "../assets/9449194.png";
import "../styles/Login.css";
import { UserAuth } from "../Context/Auth/UserAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { auth, setAuth } = useContext(UserAuth);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const check = localStorage.getItem("auth");
    if (check) {
      toast.warning("You are already logged ..!");
      setTimeout(() => {
        navigate("/home");
      }, 1000); // Delay navigation to show toast
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        { email, password },
        { withCredentials: true }
      );

      setLoading(false);

      // Log the full response to the console
      if (response.data && response.data.jwt) {
        const token = response.data.jwt;
        localStorage.setItem("auth", JSON.stringify({ token }));
        setAuth({ ...auth, token });

        const decode = jwtDecode(response.data.jwt);
        if (decode.role[0] === "ROLE_ADMIN") {
          navigate("/admin");
        } else if (decode.role[0] === "ROLE_PROFESSEUR") {
          navigate("/prof");
        }

        // Show success toast after successful login
        toast.success("Successfully logged in!");
      } else {
        console.log("JWT token not found in the response.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      setEmailError("Invalid email or password.");
      setPasswordError("Invalid email or password.");
      toast.error("Invalid email or password."); // Show error toast
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      style={{ userSelect: "none" }}
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="login-card"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Conditionally render the image */}
        {!isMobile && (
          <motion.div
            className="login-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Typography variant="h4">Welcome Back</Typography>
            <Divider sx={{ margin: "1rem 0" }} />
            <img src={userImage} alt="User" className="user-img" />
          </motion.div>
        )}

        <Card style={{ userSelect: "none" }} className="login-form">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" className="login-title">
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                sx={{ padding: { xs: "10px 0" } }}
                type="submit"
                variant="contained"
                fullWidth
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Loading Animation */}
            {loading && (
              <div className="animation-container">
                <div className="loading-bar"></div>
              </div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Login;
