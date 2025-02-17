import { useState, useEffect } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      const token = response.data["access-token"];
      localStorage.setItem("token", token); // Store the token in local storage
      alert("Login successful!");
      // Redirect to another page or update state
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
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
    <>
      <motion.div
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

          <Card className="login-form">
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
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="login-btn"
                >
                  Sign In
                </Button>
              </form>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
