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
} from "@mui/material";
import { useContext, useState } from "react";
import moduleContext from "../../Context/ModuleContext";

const ModuleTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDelete, setOpenDelete] = useState(false); // For delete dialog
  const [openEdit, setOpenEdit] = useState(false); // For edit dialog
  const [openAdd, setOpenAdd] = useState(false); // For add dialog
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [newModuleName, setNewModuleName] = useState(""); // State for new module name
  const [addModuleName, setAddModuleName] = useState(""); // State for adding a new module
  const [selectedFiliereId, setSelectedFiliereId] = useState(null); // For selecting filière
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // For pagination

  if (!filiere || filiere.length === 0) {
    return <p>No filières available.</p>;
  }

  const modules = filiere.flatMap((f) =>
    f.modules.map((module) => ({
      ...module,
      filiereName: f.name,
      filiereId: f.id, // Add filière ID to modules for easier editing
    }))
  );

  if (!modules || modules.length === 0) {
    return <p>No modules available.</p>;
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  // Filter modules based on search term
  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.filiereName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display for the current page
  const paginatedModules = filteredModules.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle edit button click
  const handleEditClick = (id) => {
    const selectedModule = modules.find((module) => module.id === id);
    if (selectedModule) {
      setSelectedModuleId(id);
      setNewModuleName(selectedModule.name); // Set the current name in the TextField
      setSelectedFiliereId(selectedModule.filiereId); // Set the selected filière
      setOpenEdit(true); // Open the edit dialog
    }
  };

  // Handle save button click in edit dialog
  const handleEditAgree = () => {
    if (selectedModuleId && newModuleName.trim() !== "" && selectedFiliereId) {
      setFiliere((prevFiliere) =>
        prevFiliere.map((f) => ({
          ...f,
          modules:
            f.id === selectedFiliereId
              ? f.modules.map((module) =>
                  module.id === selectedModuleId
                    ? { ...module, name: newModuleName }
                    : module
                )
              : f.modules.filter((module) => module.id !== selectedModuleId),
        }))
      );
      handleClose(); // Close the dialog
    }
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setSelectedModuleId(id);
    setOpenDelete(true); // Open the delete dialog
  };

  // Handle delete confirmation
  const handleDeleteAgree = () => {
    if (selectedModuleId) {
      setFiliere((prevFiliere) =>
        prevFiliere.map((f) => ({
          ...f,
          modules: f.modules.filter((module) => module.id !== selectedModuleId),
        }))
      );
    }
    handleClose(); // Close the dialog
  };

  // Handle add button click
  const handleAddClick = () => {
    setOpenAdd(true); // Open the add dialog
  };

  // Handle add confirmation
  const handleAddAgree = () => {
    if (addModuleName.trim() !== "" && selectedFiliereId) {
      const newModule = {
        id: modules.length + 1, // Generate a new ID (you can use a better ID generation method)
        name: addModuleName,
        courses: [], // Initialize with empty courses
        TD: [], // Initialize with empty TDs
        TP: [], // Initialize with empty TPs
        EXAMS: [], // Initialize with empty exams
      };
      setFiliere((prevFiliere) =>
        prevFiliere.map((f) =>
          f.id === selectedFiliereId
            ? { ...f, modules: [...f.modules, newModule] }
            : f
        )
      );
      setAddModuleName(""); // Reset the input field
      setSelectedFiliereId(null); // Reset the selected filière
      handleClose(); // Close the dialog
    }
  };

  // Close all dialogs
  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setSelectedModuleId(null);
    setNewModuleName(""); // Reset the new module name
    setAddModuleName(""); // Reset the add module name
    setSelectedFiliereId(null); // Reset the selected filière
  };

  return (
    <>
      {/* Add Module Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ m: 2 }}
      >
        Add Module
      </Button>

      {/* Search Box */}
      <TextField
        label="Search Modules"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
      />

      {/* Module Table */}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Filière Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedModules.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.id}</TableCell>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.filiereName}</TableCell>
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

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredModules.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
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

      {/* Edit Dialog */}
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
              {filiere.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

      {/* Add Module Dialog */}
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
              {filiere.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
