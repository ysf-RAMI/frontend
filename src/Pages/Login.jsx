import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI imports
import {
  TextField,
  InputAdornment,
  IconButton,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  School,
  Email,
  Lock,
  AnnouncementTwoTone,
} from "@mui/icons-material";

// Bootstrap and Reactstrap imports
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// AOS Animation
import AOS from "aos";
import "aos/dist/aos.css";

// Import school logo
import schoolLogo from "../assets/logoSite.png";

// Import custom CSS
import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
    });

    // Check if already logged in
    const auth = localStorage.getItem("auth");
    if (auth) {
      toast.info("You are already logged in");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.jwt) {
        const token = response.data.jwt;
        localStorage.setItem("auth", JSON.stringify({ token }));

        const decode = jwtDecode(token);

        // Show success message with custom styling
        toast.success("Login successful! Redirecting...");

        // Redirect based on role with delay for toast to show
        setTimeout(() => {
          if (decode.role[0] === "ROLE_ADMIN") {
            navigate("/admin");
          } else if (decode.role[0] === "ROLE_PROFESSEUR") {
            navigate("/prof");
          } else {
            navigate("/student");
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        auth: "Invalid credentials or server error",
      });
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
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

      <div className="animated-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      <Container fluid className="login-container">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={8} xl={7} className="login-card-wrapper">
            <Card className="login-card shadow" data-aos="fade-up">
              <Row className="g-0">
                <Col md={6} className="login-left-panel d-none d-md-flex">
                  <div
                    className="left-panel-content"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="school-branding">
                      <img
                        src={schoolLogo}
                        alt="School Logo"
                        className="school-logo mb-"
                      />
                      <h2 className="school-name">Doctor H1</h2>
                      <p className="school-slogan">
                        Votre plateforme d'apprentissage en ligne
                      </p>
                    </div>
                    <div
                      className="features-list"
                      style={{ userSelect: "none", cursor: "pointer" }}
                    >
                      <div
                        className="feature-item"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        onClick={() => {
                          navigate("/filiere");
                        }}
                      >
                        <div className="feature-icon">📚</div>
                        <div className="feature-text">Voir Notre Filières</div>
                      </div>
                      <div
                        className="feature-item"
                        data-aos="fade-up"
                        data-aos-delay="500"
                      >
                        <div className="feature-icon">
                          <AnnouncementTwoTone />
                        </div>
                        <div className="feature-text">
                          Suiver Notre Annonces
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6} className="login-form-panel" sty>
                  <CardBody className="p-4 p-md-5">
                    <div className="text-center mb-4" data-aos="fade-down">
                      <div className="d-md-none mb-4">
                        <img
                          src={schoolLogo}
                          alt="School Logo"
                          className="school-logo-mobile"
                        />
                      </div>
                      <h3 className="login-title">
                        <School className="me-2" />
                        Login
                      </h3>
                      <p className="text-muted">Sign in to your dashboard</p>
                    </div>

                    {errors.auth && (
                      <div className="error-alert mb-4" data-aos="shake">
                        {errors.auth}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div
                        className="mb-4"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      <div
                        className="mb-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <TextField
                          fullWidth
                          label="Password"
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          error={!!errors.password}
                          helperText={errors.password}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="primary" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      <MuiButton
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        disabled={loading}
                        className="login-button"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        {loading ? (
                          <>
                            <CircularProgress
                              size={24}
                              color="inherit"
                              className="me-2"
                            />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </MuiButton>
                    </form>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
