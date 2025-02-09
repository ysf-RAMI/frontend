import { useState } from "react";
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
import NavbarComponent from "../Components/NavbarComponent";
import userImage from "../assets/9449194.png";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log("Login submitted with:", { email, password });
  };

  return (
    <>
      <NavbarComponent />
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
