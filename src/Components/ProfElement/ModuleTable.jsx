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
  FormControl,
  Autocomplete,
  TablePagination,
  IconButton,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Add, DeleteForever, Edit } from "@mui/icons-material";

const ModuleTable = () => {
  const [modules, setModules] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [newModuleName, setNewModuleName] = useState("");
  const [addModuleName, setAddModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiliereId, setSelectedFiliereId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [semestreSelected, setSemestreSelected] = useState(null);
  const [filiers, setFiliers] = useState([]);
  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";

  const token = JSON.parse(localStorage.getItem("auth")).token;
  const profId = localStorage.getItem("profId");

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 200, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    fetchFiliers();
    fetchModules();
  }, []);

  const fetchFiliers = () => {
    axios
      .get(`${baseUrl}/api/professeur/getAllFiliere`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filières:");
      });
  };

  const fetchModules = () => {
    axios
      .get(`${baseUrl}/api/professeur/getAllModuleByProfId/${profId}`, {
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
      setSelectedFiliereId(selectedModule.filiereId);
      setSemestreSelected(selectedModule.semestre.replace("Semestre ", ""));
      setDescription(selectedModule.description);
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

      const payload = {
        id: selectedModuleId,
        name: newModuleName,
        filiereName: selectedFiliere.nom,
        semestre: `Semestre ${semestreSelected}`,
        description: description,
      };

      axios
        .put(`${baseUrl}/api/professeur/ModifyModule`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Module updated successfully");
          fetchModules();
          handleClose();
        })
        .catch((error) => {
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
      .delete(`${baseUrl}/api/professeur/DeleteModule/${selectedModuleId}`, {
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
    // Reset state for adding a new module
    setAddModuleName("");
    setSelectedFiliereId(null);
    setSemestreSelected(null);
    setDescription("");
  };

  const handleAddAgree = () => {
    if (addModuleName.trim() !== "" && selectedFiliereId && semestreSelected) {
      const selectedFiliere = filiers.find((f) => f.id === selectedFiliereId);

      // Ensure profId is a number
      const profIdNumber = Number(profId);

      // Prepare payload
      const payload = {
        idProfesseur: profIdNumber,
        name: addModuleName,
        semestre: `Semestre ${semestreSelected}`,
        filiereName: selectedFiliere.nom,
        description: description,
      };

      axios
        .post(`${baseUrl}/api/professeur/AddNewModule`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Module added successfully");
          fetchModules();
          handleClose();
        })
        .catch((error) => {
          toast.error(
            `Error adding module: ${
              error.response?.data?.message || error.message
            }`
          );
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
    setDescription("");
  };

  return (
    <div >
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

      <Box sx={{display:"flex",justifyContent:"space-between"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          sx={{ m: 2 }}
          data-aos="fade-down"
          startIcon={<Add />}
        >
          Add Module
        </Button>

        <TextField
          label="Search Modules"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ m: 2, width: "300px" }}
          data-aos="fade-down"
        />
      </Box>

      <TableContainer component={Paper} sx={{ m: 1 }} data-aos="fade-up">
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Filière Name</TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedModules.map((module, index) => (
              <TableRow
                key={module.id}
                data-aos="fade-right"
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "transparent",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.filiereName}</TableCell>
                <TableCell>{module.semestre}</TableCell>
                <TableCell>{module.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(module.id)}>
                    <Edit color="primary" />
                  </IconButton>

                  <IconButton onClick={() => handleDeleteClick(module.id)}>
                    <DeleteForever color="error" />
                  </IconButton>
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
        data-aos="fade-up" // Add fade-up animation
      />

      <Dialog
        open={openDelete}
        onClose={handleClose}
        data-aos="zomm-in"
        data-aos-duration="300"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right,rgb(171, 0, 0), #01162e)",
            color: "white",
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Delete Module
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="error" sx={{ mt: 2 }}>
            Are you sure you want to delete this module? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteAgree}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleClose}
        data-aos="fade-down"
        data-aos-duration="300"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
            color: "white",
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Edit Module
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new details for the module:
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Autocomplete
              style={{
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              id="filiere"
              options={filiers}
              getOptionLabel={(filiere) => filiere.nom}
              renderInput={(params) => (
                <TextField {...params} label="Filière" />
              )}
              value={
                filiers.find((filiere) => filiere.id === selectedFiliereId) ||
                null
              }
              onChange={(e, filiere) =>
                setSelectedFiliereId(filiere ? filiere.id : "")
              }
            />
          </FormControl>

          <TextField
            autoFocus
            required
            margin="dense"
            id="semestre"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSemestreSelected(e.target.value);
              let value = parseInt(e.target.value, 10);
              if (isNaN(value) || value < 1) value = 1;
              if (value > 12) value = 12;
              setSemestreSelected(value);
            }}
            value={semestreSelected || ""}
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
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={handleEditAgree}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdd}
        onClose={handleClose}
        data-aos="zomm-in"
        data-aos-duration="300"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
            color: "white",
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Add Module
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a filière and enter the module details:
          </DialogContentText>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Autocomplete
              style={{
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              id="filiere"
              options={filiers}
              getOptionLabel={(filiere) => filiere.nom}
              renderInput={(params) => (
                <TextField {...params} label="Filière" />
              )}
              value={
                filiers.find((filiere) => filiere.id === selectedFiliereId) ||
                null
              }
              onChange={(e, filiere) =>
                setSelectedFiliereId(filiere ? filiere.id : "")
              }
            />
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="semestre"
            type="number"
            fullWidth
            variant="standard"
            value={semestreSelected || ""}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);
              if (isNaN(value) || value < 1) value = 1;
              if (value > 12) value = 12;
              setSemestreSelected(value);
            }}
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
          <TextField
            focused
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="filled"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="info">
            Cancel
          </Button>
          <Button onClick={handleAddAgree} variant="outlined" color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModuleTable;
