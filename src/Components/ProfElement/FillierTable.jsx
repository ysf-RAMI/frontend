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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import moduleContext from "../../Context/ModuleContext";

const FiliereTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDelete, setOpenDelete] = useState(false); // For delete dialog
  const [openEdit, setOpenEdit] = useState(false); // For edit dialog
  const [openAdd, setOpenAdd] = useState(false); // For add dialog
  const [selectedFiliereId, setSelectedFiliereId] = useState(null);
  const [newFiliereName, setNewFiliereName] = useState(""); // State for new filière name
  const [addFiliereName, setAddFiliereName] = useState(""); // State for adding a new filière

  if (!filiere || filiere.length === 0) {
    return <p>No filières available.</p>;
  }

  // Handle edit button click
  const handleEditClick = (id) => {
    const selectedFiliere = filiere.find((f) => f.id === id);
    if (selectedFiliere) {
      setSelectedFiliereId(id);
      setNewFiliereName(selectedFiliere.name); // Set the current name in the TextField
      setOpenEdit(true); // Open the edit dialog
    }
  };

  // Handle save button click in edit dialog
  const handleEditAgree = () => {
    if (selectedFiliereId && newFiliereName.trim() !== "") {
      setFiliere((prevFiliere) =>
        prevFiliere.map((f) =>
          f.id === selectedFiliereId ? { ...f, name: newFiliereName } : f
        )
      );
      handleClose(); // Close the dialog
    }
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setSelectedFiliereId(id);
    setOpenDelete(true); // Open the delete dialog
  };

  // Handle delete confirmation
  const handleDeleteAgree = () => {
    if (selectedFiliereId) {
      setFiliere(filiere.filter((f) => f.id !== selectedFiliereId));
    }
    handleClose(); // Close the dialog
  };

  // Handle add button click
  const handleAddClick = () => {
    setOpenAdd(true); // Open the add dialog
  };

  // Handle add confirmation
  const handleAddAgree = () => {
    if (addFiliereName.trim() !== "") {
      const newFiliere = {
        id: filiere.length + 1, // Generate a new ID (you can use a better ID generation method)
        name: addFiliereName,
        modules: [], // Initialize with empty modules
      };
      setFiliere((prevFiliere) => [...prevFiliere, newFiliere]);
      setAddFiliereName(""); // Reset the input field
      handleClose(); // Close the dialog
    }
  };

  // Close all dialogs
  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setSelectedFiliereId(null);
    setNewFiliereName(""); // Reset the new filière name
    setAddFiliereName(""); // Reset the add filière name
  };

  return (
    <>
      {/* Add Filière Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ m: 2 }}
      >
        Add Filière
      </Button>

      {/* Filière Table */}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom Filière</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filiere.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.id}</TableCell>
                <TableCell>{f.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(f.id)} color="info">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(f.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete Filière</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this filière? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAgree}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Filière</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new name for the filière:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Filière Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFiliereName}
            onChange={(e) => setNewFiliereName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditAgree}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Filière Dialog */}
      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle>Add Filière</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Filière Name"
            type="text"
            fullWidth
            variant="standard"
            value={addFiliereName}
            onChange={(e) => setAddFiliereName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAgree}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FiliereTable;
