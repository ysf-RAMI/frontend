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
  Paper,
} from "@mui/material";
import {
  Assignment,
  Book,
  Description,
  Quiz,
  Article,
} from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CorsTable from "../Components/ProfElement/CorsTable";
import ExamTable from "../Components/ProfElement/ExamTable";
import ModuleTable from "../Components/ProfElement/ModuleTable";
import TDTable from "../Components/ProfElement/TdTable";
import TPTable from "../Components/ProfElement/TpTable";

const Prof = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("module");
  const theme = useTheme();

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    // Close the drawer on small screens when a section is selected
    if (isSmallScreen) {
      toggleDrawer(false);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "#01162e",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Menu
      </Typography>
      <List style={{ userSelect: "none" }}>
        {[
          { name: "Module", icon: <Assignment />, section: "module" },
          { name: "Cours", icon: <Book />, section: "cors" },
          { name: "TD", icon: <Description />, section: "td" },
          { name: "TP", icon: <Article />, section: "tp" },
          { name: "Exam", icon: <Quiz />, section: "exam" },
        ].map(({ name, icon, section }) => (
          <ListItem
            button
            key={section}
            onClick={() => handleSectionClick(section)}
            sx={{
              "&:hover": { backgroundColor: "#003366" },
              borderRadius: 1,
              mb: 1,
              backgroundColor: selectedSection === section ? "#003366" : "",
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", mt: "64px" , paddingTop:"20px" , }}>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            height: "91%",
            marginTop: "84px",
            boxSizing: "border-box",
            backgroundColor: "#01162e",
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
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
          </Typography>
          {selectedSection === "module" && <ModuleTable />}
          {selectedSection === "cors" && <CorsTable />}
          {selectedSection === "td" && <TDTable />}
          {selectedSection === "tp" && <TPTable />}
          {selectedSection === "exam" && <ExamTable />}
        </Paper>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Prof;
