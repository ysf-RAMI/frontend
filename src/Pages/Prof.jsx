import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  AppBar,
  Badge,
} from "@mui/material";
import {
  Assignment,
  Logout,
  Person,
  Home,
  AccountCircle,
  MenuOutlined,
  Book,
  Description,
  Article,
  Quiz,
  Announcement,
  Dashboard,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CorsTable from "../Components/ProfElement/CorsTable";
import ExamTable from "../Components/ProfElement/ExamTable";
import ModuleTable from "../Components/ProfElement/ModuleTable";
import TDTable from "../Components/ProfElement/TdTable";
import TpTable from "../Components/ProfElement/TpTable";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logoSite.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Annonce from "../Components/ProfElement/Annoce";
import Profile from "../Components/ProfElement/Profile";
import ProfDashboard from "../Components/ProfElement/ProfDashboard";

// eslint-disable-next-line react/prop-types
const Prof = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/api/professeur";

  const token = JSON.parse(localStorage.getItem("auth")).token;

  const decoded = jwtDecode(token);
  const email = decoded.sub;

  useEffect(() => {
    axios
      .get(`${baseUrl}/GetProfesseur/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        const { id } = response.data;
        localStorage.setItem("profId", id);
      })
      .catch((error) => {
        console.error("Error fetching professeur:", error);
      });
  }, [token]);

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
        backgroundColor: "#01162e",
        height: "100vh",
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
      <List style={{ userSelect: "none", marginTop: "auto" }}>
        <p style={{ color: "grey", fontSize: "12px" }}>Management</p>
        {[
          { name: "Dashboard", icon: <Dashboard />, section: "dashboard" },
          { name: "Module", icon: <Assignment />, section: "module" },
          { name: "Cours", icon: <Book />, section: "cors" },
          { name: "TD", icon: <Description />, section: "td" },
          { name: "TP", icon: <Article />, section: "tp" },
          { name: "Exam", icon: <Quiz />, section: "exam" },
          { name: "Annonce", icon: <Announcement />, section: "annonce" },
        ].map(({ name, icon, section }) => (
          <ListItem
            key={section}
            onClick={() => handleSectionClick(section)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#003366" },
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: selectedSection === section ? "#003366" : "",
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <p style={{ color: "grey", fontSize: "12px", marginTop: "1px" }}>
        Settings
      </p>
      <ListItem
        button
        onClick={() => handleSectionClick("profile")}
        sx={{
          "&:hover": { backgroundColor: "#003366" },
          borderRadius: 1,
          mb: 1,
          backgroundColor: selectedSection === "profile" ? "#003366" : "",
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
          "&:hover": { backgroundColor: "#003366" },
          borderRadius: 1,
          mb: 1,
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
            bgcolor: "transparent",
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
      <Box sx={{ display: "flex", height: "100%" }}>
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
            pb:2,
            pr:2,
            pl:2,
            backgroundColor: "#f2f2f2",
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            marginLeft: isSmallScreen ? 0 : isDrawerOpen ? "250px" : 0,
            width: isSmallScreen
              ? "100%"
              : `calc(100% - ${isDrawerOpen ? 250 : 0}px)`,
            marginTop: "64px",
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
            </Typography>
            {selectedSection === "module" && <ModuleTable />}
            {selectedSection === "cors" && <CorsTable />}
            {selectedSection === "td" && <TDTable />}
            {selectedSection === "tp" && <TpTable />}
            {selectedSection === "exam" && <ExamTable />}
            {selectedSection === "annonce" && <Annonce />}
            {selectedSection === "profile" && <Profile />}{" "}
            {selectedSection === "dashboard" && <ProfDashboard />}
            {/* Corrected here */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Prof;
