import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  useTheme,
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
  MenuOutlined,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboardd from "../Components/Dashboard/Dashboard";
import FiliereTable from "../Components/Admin/FillierTable";
import ProfTable from "../Components/Admin/ProfTable";
import logo from "../assets/logoSite.png";
import { Link, useNavigate } from "react-router-dom";
import Profil from "../Components/Admin/Profil";

// eslint-disable-next-line react/prop-types
const Admin = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    if (isSmallScreen) {
      toggleDrawer(false); // Auto-close the drawer on small screens
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth");
      toast.success("Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      toast.error("Failed to logout!");
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#01162e", // Dark mode background
        color: "#fff",
        padding: "20px",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        <Link to="/">
          <img
            src={logo}
            alt="Site Logo"
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
                "&:hover": { backgroundColor: "#003366" }, // Dark mode hover
                borderRadius: 1,
                mb: 1,
                ":active": { backgroundColor: "#004366" }, // Dark mode active
                backgroundColor: selectedSection === section ? "#003366" : "",
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
              "&:hover": { backgroundColor: "#003366" }, // Dark mode hover
              borderRadius: 1,
              mb: 1,
              ":active": { backgroundColor: "#004466" }, // Dark mode active
              backgroundColor: selectedSection === section ? "#003366" : "",
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
        onClick={() => handleSectionClick("profile")}
        sx={{
          "&:hover": { backgroundColor: "#003366" }, // Dark mode hover
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
          "&:hover": { backgroundColor: "#003366" }, // Dark mode hover
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ boxShadow: "none", padding: "10px" }}
          sx={{
            bgcolor: "transparent", // Dark mode background
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
                      color: "#01162e",
                    }}
                    onClick={() => navigate("/")}
                  />
                </Badge>
              </IconButton>
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
              boxSizing: "border-box",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              backgroundColor: "#01162e !important",
            },
            height: "100vh",
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
            backgroundColor: "transparent",
            color: "#000",
          }}
        >
          <Box sx={{  mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
            </Typography>
            {selectedSection === "filiere" && <FiliereTable />}

            {selectedSection === "prof" && <ProfTable />}

            {selectedSection === "dashboard" && <Dashboardd />}
            {selectedSection === "profile" && <Profil />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
