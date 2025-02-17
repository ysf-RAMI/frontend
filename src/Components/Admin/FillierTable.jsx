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
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedFiliereId, setSelectedFiliereId] = useState(null);
  const [newFiliereName, setNewFiliereName] = useState("");
  const [addFiliereName, setAddFiliereName] = useState("");

  if (!filiere || filiere.length === 0) {
    return <p>No filières available.</p>;
  }

  const handleEditClick = (id) => {
    const selectedFiliere = filiere.find((f) => f.id === id);
    if (selectedFiliere) {
      setSelectedFiliereId(id);
      setNewFiliereName(selectedFiliere.name);
      setOpenEdit(true);
    }
  };

  const handleEditAgree = () => {
    if (selectedFiliereId && newFiliereName.trim() !== "") {
      setFiliere((prevFiliere) =>
        prevFiliere.map((f) =>
          f.id === selectedFiliereId ? { ...f, name: newFiliereName } : f
        )
      );
      handleClose();
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedFiliereId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = () => {
    if (selectedFiliereId) {
      setFiliere(filiere.filter((f) => f.id !== selectedFiliereId));
    }
    handleClose();
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleAddAgree = () => {
    if (addFiliereName.trim() !== "") {
      const newFiliere = {
        id: filiere.length + 1,
        name: addFiliereName,
        modules: [],
      };
      setFiliere((prevFiliere) => [...prevFiliere, newFiliere]);
      setAddFiliereName("");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setSelectedFiliereId(null);
    setNewFiliereName("");
    setAddFiliereName("");
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ m: 2 }}
      >
        Add Filière
      </Button>

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
