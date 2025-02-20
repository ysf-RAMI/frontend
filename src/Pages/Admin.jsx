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
  MenuList,
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
  MenuOpen,
  MenuOutlined,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboardd from "../Components/Dashboard/Dashboard";
import FiliereTable from "../Components/Admin/FillierTable";
import ProfTable from "../Components/Admin/ProfTable";
import axios from "axios";
import logo from "../assets/logoSite.png";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext
import { GridMenuIcon } from "@mui/x-data-grid";

const Admin = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [profs, setProfs] = useState([]);
  const [filiere, setFiliere] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
  const theme = useTheme();
  const navigate = useNavigate();

  const baseUrl = "http://localhost:8080/api/admin";

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    if (isSmallScreen) {
      toggleDrawer(false); // Auto-close the drawer on small screens
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
   }, 500);
 };

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      return;
    }
    try {
      const { token } = JSON.parse(storedAuth);
      console.log("Extracted Token: ", token);
      axios
        .get(`${baseUrl}/ListProfesseurs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setProfs(response.data))
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

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      return;
    }
    try {
      const { token } = JSON.parse(storedAuth);
      console.log("Extracted Token: ", token);
      axios
        .get(`${baseUrl}/getAllFiliere`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setFiliere(response.data))
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
        <p style={{ color: "grey", fontSize: "14px" }}>Statistics</p>
        {[{ name: "Dashboard", icon: <Dashboard />, section: "dashboard" }].map(
          ({ name, icon, section }) => (
            <ListItem
              key={section}
              onClick={() => handleSectionClick(section)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: darkMode ? "#333" : "#003366" }, // Dark mode hover
                borderRadius: 1,
                mb: 1,
                ":active": { backgroundColor: darkMode ? "#444" : "#004366" }, // Dark mode active
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
          )
        )}
      </List>
      <List style={{ userSelect: "none", marginTop: "40px" }}>
        <p style={{ color: "grey", fontSize: "14px" }}>Gestion</p>
        {[
          { name: "Filières", icon: <Assignment />, section: "filiere" },
          { name: "Professeurs", icon: <Person />, section: "prof" },
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
      <p style={{ color: "grey", fontSize: "14px", marginTop: "90px" }}>
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
          <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
            </Typography>
            {selectedSection === "filiere" && (
              <FiliereTable filiers={filiere} setFiliers={setFiliere} />
            )}

            {selectedSection === "prof" && (
              <ProfTable profs={profs} setProfs={setProfs} />
            )}

            {selectedSection === "dashboard" && <Dashboardd />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
