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
  TextField,
} from "@mui/material";
import { useState } from "react";

const DynamicTable = ({ section, data: initialData }) => {
  // Define column headers for each section
  const columnHeaders = {
    filiere: ["ID", "Name", "Link", "Filière Name", "Action"],
    module: ["ID", "Name", "Link", "Module Name", "Action"],
    cors: ["ID", "Name", "Link", "Cors Name", "Action"],
    td: ["ID", "Name", "Link", "TD Name", "Action"],
    tp: ["ID", "Name", "Link", "TP Name", "Action"],
    exam: ["ID", "Name", "Link", "Exam Name", "Action"],
  };

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState(initialData);

  // Open the edit dialog and set the selected row
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  // Handle input changes in the edit dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save the edited row
  const handleSave = () => {
    const updatedData = data.map((row) =>
      row.id === selectedRow.id ? selectedRow : row
    );
    setData(updatedData);
    handleClose();
  };

  // Delete a row
  const handleDelete = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  return (
    <>
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
                <TableCell>
                  <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="info"
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the selected row.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={selectedRow?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="link"
            label="Link"
            fullWidth
            value={selectedRow?.link || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="filiereName"
            label="Filière Name"
            fullWidth
            value={selectedRow?.filiereName || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DynamicTable;
