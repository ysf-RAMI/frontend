import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Drawer,
  useTheme,
} from "@mui/material";
import { School, Assignment, Book, Description, Quiz, Article } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Prof.css";
import CorsTable from "../Components/ProfElement/CorsTable";
import ExamTable from "../Components/ProfElement/ExamTable";
import FiliereTable from "../Components/ProfElement/FillierTable";
import ModuleTable from "../Components/ProfElement/ModuleTable";
import TDTable from "../Components/ProfElement/TdTable";
import TPTable from "../Components/ProfElement/TpTable";

const Prof = ({ isDrawerOpen, toggleDrawer, isSmallScreen }) => {
  const [selectedSection, setSelectedSection] = useState("filiere");
  const [open, setOpen] = useState({
    filiereOpen: true,
    moduleOpen: false,
    corsOpen: false,
    tdOpen: false,
    tpOpen: false,
    examOpen: false,
  });

  const theme = useTheme();

  // Function to handle section selection and update the open state
  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setOpen((prevState) => {
      // Reset all states to false
      const resetState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Set the selected section to true
      return {
        ...resetState,
        [`${section}Open`]: true,
      };
    });
  };

  const drawerContent = (
    <Box
      sx={{
        width: 249,
        height: "100%",
        backgroundColor: "#263238",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItem
          button
          onClick={() => handleSectionClick("filiere")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <School sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Filière" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleSectionClick("module")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Assignment sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Module" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleSectionClick("cors")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Book sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Cours" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleSectionClick("td")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Description sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="TD" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleSectionClick("tp")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Article sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="TP" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleSectionClick("exam")}
          sx={{
            "&:hover": { backgroundColor: "#37474F" },
            borderRadius: 1,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Quiz sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Exam" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 76px)", mt: "76px" }}>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            height: "90%",
            marginTop: "76px",
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
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typography variant="h4" gutterBottom>
            {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 3 }}>
            Add {selectedSection}
          </Button>

          {open.filiereOpen && <FiliereTable />}
          {open.moduleOpen && <ModuleTable />}
          {open.corsOpen && <CorsTable />}
          {open.tdOpen && <TDTable />}
          {open.tpOpen && <TPTable />}
          {open.examOpen && <ExamTable />}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Prof;