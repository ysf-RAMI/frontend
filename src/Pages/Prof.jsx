import {
  Box,
  Grid2,
  List,
  ListItem,
  Container,
  Typography,
} from "@mui/material";
import { School, Assignment, AccessTime } from "@mui/icons-material";
import DynamicTable from "../Components/ProfElement/DynamicTable"; // import the new generic table
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Sample data for each section
  const data = {
    filiere: [
      {
        id: 1,
        name: "Programming Web",
        link: "Module Link",
        filiereName: "Informatique et Réseaux",
      },
      {
        id: 2,
        name: "Administration des Réseaux",
        link: "Module Link",
        filiereName: "Systèmes et Réseaux",
      },
    ],
    module: [
      {
        id: 1,
        name: "Database Systems",
        link: "Module Link",
        moduleName: "Informatique et Réseaux",
      },
      {
        id: 2,
        name: "Web Development",
        link: "Module Link",
        moduleName: "Systèmes et Réseaux",
      },
    ],
    cors: [
      {
        id: 1,
        name: "Web Security",
        link: "Cors Link",
        corsName: "Network Security",
      },
      {
        id: 2,
        name: "Routing Protocols",
        link: "Cors Link",
        corsName: "Advanced Networking",
      },
    ],
    td: [
      {
        id: 1,
        name: "Web Development TD",
        link: "TD Link",
        tdName: "Front-end Techniques",
      },
      {
        id: 2,
        name: "Database TD",
        link: "TD Link",
        tdName: "Database Design",
      },
    ],
    tp: [
      {
        id: 1,
        name: "Networking TP",
        link: "TP Link",
        tpName: "IP Configuration",
      },
      { id: 2, name: "Web TP", link: "TP Link", tpName: "Web Server Setup" },
    ],
    exam: [
      {
        id: 1,
        name: "Final Exam",
        link: "Exam Link",
        examName: "Web Development",
      },
      {
        id: 2,
        name: "Mid-Term Exam",
        link: "Exam Link",
        examName: "Database Systems",
      },
    ],
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
        <Box
          style={{
            width: "100%",
            overflowX: "auto", // prevents horizontal scroll for large tables
          }}
        >
          {open.filiere && (
            <DynamicTable section="filiere" data={data.filiere} />
          )}
          {open.module && <DynamicTable section="module" data={data.module} />}
          {open.cors && <DynamicTable section="cors" data={data.cors} />}
          {open.td && <DynamicTable section="td" data={data.td} />}
          {open.tp && <DynamicTable section="tp" data={data.tp} />}
          {open.exam && <DynamicTable section="exam" data={data.exam} />}
        </Box>
      </Grid2>

      <ToastContainer />
    </Container>
  );
};

export default Prof;
