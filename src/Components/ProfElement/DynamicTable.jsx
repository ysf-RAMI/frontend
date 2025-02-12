import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

const DynamicTable = ({ section, data }) => {
  // Define column headers for each section
  const columnHeaders = {
    filiere: ["ID", "Name", "Link", "Filière Name", "Action"],
    module: ["ID", "Name", "Link", "Module Name", "Action"],
    cors: ["ID", "Name", "Link", "Cors Name", "Action"],
    td: ["ID", "Name", "Link", "TD Name", "Action"],
    tp: ["ID", "Name", "Link", "TP Name", "Action"],
    exam: ["ID", "Name", "Link", "Exam Name", "Action"],
  };

  const [open,setOpen] = useState(false);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columnHeaders[section].map((header, index) => (
              <TableCell
                key={index}
                align={header.numeric ? "right" : "left"}
                padding={header.disablePadding ? "none" : "normal"}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.link}</TableCell>
              <TableCell>
                {row.filiereName || row.moduleName || row.name}
              </TableCell>

              <Dialog
                open={open}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button>Disagree</Button>
                  <Button>Agree</Button>
                </DialogActions>
              </Dialog>

              <TableCell>
                <Button
                  sx={{ mr: 1 }}
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    handleEditName();
                  }}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="warning">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
