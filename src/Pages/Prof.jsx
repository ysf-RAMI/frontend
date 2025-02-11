import { Box, Grid2, List, ListItem, Container, Typography } from "@mui/material";
import { Edit, Delete, Home, School, Assignment, AccessTime } from "@mui/icons-material";
import "../styles/Prof.css";
import CorsTable from "../Components/ProfElement/CorsTable";
import FiliereTable from "../Components/ProfElement/FillierTable";
import ModuleTable from "../Components/ProfElement/ModuleTable";
import TDTable from "../Components/ProfElement/TDTable";
import TPTable from "../Components/ProfElement/TPTable";
import ExamTable from "../Components/ProfElement/ExamTable";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Prof = () => {
  const [open, setOpen] = useState({
    filiere: true,
    module: false,
    cors: false,
    td: false,
    tp: false,
    exam: false,
  });

  const handleClick = (section) => {
    setOpen((prevState) => {
      const updatedState = { ...prevState };
      for (let key in updatedState) {
        updatedState[key] = key === section;
      }
      return updatedState;
    });
  };

  const handleToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Container
      style={{
        marginTop: "50px",
        padding: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        minHeight: "80vh",
      }}
    >
      {/* Sidebar */}
      <Grid2
        item
        xs={2}
        style={{
          position: "sticky",
          top: "50px",
          padding: "20px",
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          backgroundColor: "#263238",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          School Portal
        </Typography>
        <List>
          <ListItem button onClick={() => handleClick("filiere")}>
            <School /> Filière
          </ListItem>
          <ListItem button onClick={() => handleClick("module")}>
            <Assignment /> Module
          </ListItem>
          <ListItem button onClick={() => handleClick("cors")}>
            <AccessTime /> Cors
          </ListItem>
          <ListItem button onClick={() => handleClick("td")}>
            <AccessTime /> TD
          </ListItem>
          <ListItem button onClick={() => handleClick("tp")}>
            <AccessTime /> TP
          </ListItem>
          <ListItem button onClick={() => handleClick("exam")}>
            <Assignment /> Exam
          </ListItem>
        </List>
      </Grid2>

      {/* Main Content */}
      <Grid2
        item
        xs={8}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          height: "calc(100vh - 50px)",
          overflowY: "auto",
        }}
      >
        {open.filiere && <FiliereTable open={open.filiere} />}
        {open.module && <ModuleTable open={open.module} />}
        {open.cors && <CorsTable open={open.cors} />}
        {open.td && <TDTable open={open.td} />}
        {open.tp && <TPTable open={open.tp} />}
        {open.exam && <ExamTable open={open.exam} />}
      </Grid2>

      <ToastContainer />
    </Container>
  );
};

export default Prof;
