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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Input,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModuleTable = () => {
  const [modules, setModules] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [newModuleName, setNewModuleName] = useState("");
  const [addModuleName, setAddModuleName] = useState("");
  const [selectedFiliereId, setSelectedFiliereId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [semestreSelected, setSemestreSelected] = useState(null);
  const [filiers, setFiliers] = useState([]);
  const baseUrl = "http://localhost:8080/api/professeur";

  const token = JSON.parse(localStorage.getItem("auth")).token;
  const profId = localStorage.getItem("profId");

  useEffect(() => {
    fetchFiliers();
    fetchModules();
  }, []);

  const fetchFiliers = () => {
    axios
      .get(`${baseUrl}/getAllFiliere`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filières:", error);
      });
  };

  const fetchModules = () => {
    axios
      .get(`${baseUrl}/getAllModuleByProfId/${profId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.filiereName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedModules = filteredModules.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (id) => {
    const selectedModule = modules.find((module) => module.id === id);
    if (selectedModule) {
      setSelectedModuleId(id);
      setNewModuleName(selectedModule.name);
      setSelectedFiliereId(selectedModule.filiereId); // Use filiereId instead of filiereName
      setSemestreSelected(selectedModule.semestre.replace("Semestre ", "")); // Set the current semestre
      setOpenEdit(true);
    }
  };

  const handleEditAgree = () => {
    if (
      selectedModuleId &&
      newModuleName.trim() !== "" &&
      selectedFiliereId &&
      semestreSelected
    ) {
      const selectedFiliere = filiers.find((f) => f.id === selectedFiliereId);

      // Payload to send to the backend
      const payload = {
        id: selectedModuleId,
        name: newModuleName,
        filiereName: selectedFiliere.nom,
        semestre: `Semestre ${semestreSelected}`,
      };

      axios
        .put(`${baseUrl}/ModifyModule`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Module updated successfully");
          fetchModules(); // Refresh the module list
          handleClose(); // Close the dialog
        })
        .catch((error) => {
          console.error("Error updating module:", error); // Debugging
          toast.error(`Error updating module: ${error.message}`);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedModuleId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = () => {
    axios
      .delete(`${baseUrl}/DeleteModule/${selectedModuleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Module deleted successfully");
        fetchModules();
      })
      .catch((error) => {
        toast.error(`Error deleting module: ${error.message}`);
      })
      .finally(() => {
        handleClose();
        fetchModules();
      });
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleAddAgree = () => {
    if (addModuleName.trim() !== "" && selectedFiliereId && semestreSelected) {
      const selectedFiliere = filiers.find((f) => f.id === selectedFiliereId);

      axios
        .post(
          `${baseUrl}/AddNewModule`,
          {
            idProfesseur: profId,
            name: addModuleName,
            semestre: `Semestre ${semestreSelected}`,
            filiereName: selectedFiliere.nom,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Module added successfully");
          fetchModules();
          handleClose();
        })
        .catch((error) => {
          toast.error(`Error adding module: ${error.message}`);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setSelectedModuleId(null);
    setNewModuleName("");
    setAddModuleName("");
    setSelectedFiliereId(null);
    setSemestreSelected(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ m: 2 }}
      >
        Add Module
      </Button>

      <TextField
        label="Search Modules"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
      />

      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Filière Name</TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedModules.map((module, index) => (
              <TableRow key={module.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.filiereName}</TableCell>
                <TableCell>{module.semestre}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditClick(module.id)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(module.id)}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredModules.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this module? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAgree}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new name for the module:
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filière</InputLabel>
            <Select
              value={selectedFiliereId || ""}
              onChange={(e) => setSelectedFiliereId(e.target.value)}
              label="Filière"
            >
              {filiers.map((filiere) => (
                <MenuItem key={filiere.id} value={filiere.id}>
                  {filiere.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            value={semestreSelected || ""}
            onChange={(e) => setSemestreSelected(e.target.value)}
            label="Semestre"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Module Name"
            type="text"
            fullWidth
            variant="standard"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditAgree}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle>Add Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a filière and enter the module name:
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filière</InputLabel>
            <Select
              value={selectedFiliereId || ""}
              onChange={(e) => setSelectedFiliereId(e.target.value)}
              label="Filière"
            >
              {filiers.map((filiere) => (
                <MenuItem key={filiere.id} value={filiere.id}>
                  {filiere.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            type="number"
            fullWidth
            variant="standard"
            value={semestreSelected || ""}
            onChange={(e) => setSemestreSelected(e.target.value)}
            label="Semestre number"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Module Name"
            type="text"
            fullWidth
            variant="standard"
            value={addModuleName}
            onChange={(e) => setAddModuleName(e.target.value)}
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

export default ModuleTable;
