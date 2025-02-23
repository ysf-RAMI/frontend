import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  AppBar,
  Badge,
} from "@mui/material";
import {
  Assignment,
  Dashboard,
  Logout,
  Person,
  Home,
  AccountCircle,
  Brightness4,
  Brightness7,
  MenuOutlined,
  Book,
  Description,
  Article,
  Quiz,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CorsTable from "../Components/ProfElement/CorsTable";
import ExamTable from "../Components/ProfElement/ExamTable";
import ModuleTable from "../Components/ProfElement/ModuleTable";
import TDTable from "../Components/ProfElement/TdTable";
import TPTable from "../Components/ProfElement/TpTable";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext
import logo from "../assets/logoSite.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ResourceManager from "../Components/ProfElement/ResourceManager";

const Prof = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("module");
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
  const theme = useTheme();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const basUrl = "http://localhost:8080/api/professeur";
  const [cors, setCors] = useState([]);
  const [exams, setExams] = useState([]);
  const [tds, setTds] = useState([]);
  const [tps, setTps] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      return;
    }
    try {
      const { token } = JSON.parse(storedAuth);
      console.log(token);
      const email = jwtDecode(token).sub;
      console.log(email);
      axios
        .get(`${basUrl}/GetProfesseur/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setModules(response.data);
          localStorage.setItem("profId", JSON.stringify(response.data.id));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (error.response) {
            console.error("Response Data:", error.response.data);
          }
        });
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    if (isSmallScreen) {
      toggleDrawer(false);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 10);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#01162e", // Dark mode background
        color: "#fff",
        padding: "20px",
        borderRadius: "0 10px 10px 0",
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
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        <Link to="/">
          <img
            src={logo}
            style={{ width: "200px" }}
            onClick={() => navigate("/")}
          />
        </Link>
      </Typography>
      <List style={{ userSelect: "none", marginTop: "50px" }}>
        <p style={{ color: "grey", fontSize: "14px" }}>Management</p>
        {[
          { name: "Module", icon: <Assignment />, section: "module" },
          { name: "Cours", icon: <Book />, section: "cors" },
          { name: "TD", icon: <Description />, section: "td" },
          { name: "TP", icon: <Article />, section: "tp" },
          { name: "Exam", icon: <Quiz />, section: "exam" },
        ].map(({ name, icon, section }) => (
          <ListItem
            key={section}
            onClick={() => handleSectionClick(section)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: darkMode ? "#333" : "#003366" }, // Dark mode hover
              borderRadius: 1,
              mb: 1,
              ":active": { backgroundColor: darkMode ? "#444" : "#004466" }, // Dark mode active
              backgroundColor:
                selectedSection === section
                  ? darkMode
                    ? "#333"
                    : "#003366"
                  : "",
              "&:first-of-type": { mt: -1 },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <p style={{ color: "grey", fontSize: "14px", marginTop: "65px" }}>
        Settings
      </p>
      <ListItem
        button
        onClick={() => navigate("/profile")}
        sx={{
          "&:hover": { backgroundColor: darkMode ? "#333" : "#003366" }, // Dark mode hover
          borderRadius: 1,
          mb: 1,
          backgroundColor: selectedSection === "admin" ? "#003366" : "",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        <ListItemIcon sx={{ color: "#ffffff" }}>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem
        button
        onClick={handleLogout}
        sx={{
          "&:hover": { backgroundColor: darkMode ? "#333" : "#003366" }, // Dark mode hover
          borderRadius: 1,
          mb: 1,
          backgroundColor: selectedSection === "admin" ? "#003366" : "",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        <ListItemIcon sx={{ color: "#ffffff" }}>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ boxShadow: "none", padding: "10px" }}
          sx={{
            bgcolor: darkMode ? "#121212" : "transparent", // Dark mode background
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: isSmallScreen
              ? "100%"
              : `calc(100% - ${isDrawerOpen ? 250 : 0}px)`,
            marginLeft: isSmallScreen ? 0 : isDrawerOpen ? "250px" : 0,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuOutlined color="inherit" />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                size="large"
              >
                <Badge color="error">
                  <Home
                    style={{
                      color: darkMode ? "#fff" : "#01162e", // Dark mode icon color
                    }}
                    onClick={() => navigate("/")}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{ color: darkMode ? "#fff" : "#01162e" }} />{" "}
                {/* Dark mode icon color */}
              </IconButton>
              <Menu
                id="primary-search-account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={toggleTheme}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 255,
              height: "100vh",
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: isSmallScreen ? 0 : isDrawerOpen ? "250px" : 0,
            width: isSmallScreen
              ? "100%"
              : `calc(100% - ${isDrawerOpen ? 250 : 0}px)`,
            marginTop: "64px",
            backgroundColor: darkMode ? "#121212" : "#fff", // Dark mode background
            color: darkMode ? "#fff" : "#000", // Dark mode text color
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
            </Typography>
            {selectedSection === "module" && <ModuleTable />}
            {selectedSection === "cors" && (
              <ResourceManager resourceType="COURS" />
            )}
            {selectedSection === "td" && <ResourceManager resourceType="TD" />}
            {selectedSection === "tp" && <ResourceManager resourceType="TP" />}
            {selectedSection === "exam" && (
              <ResourceManager resourceType="EXAM" />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Prof;
