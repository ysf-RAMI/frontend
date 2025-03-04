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
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  LinearProgress,
  Typography,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const TDTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [tds, setTds] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTd, setSelectedTd] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const baseUrl = "http://localhost:8080/api/professeur";
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
    fetchResources();
    fetchModules();
  }, []);

  const fetchResources = () => {
    axios
      .get(`${baseUrl}/getAllResources/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched Resources:", response.data);
        setResource(response.data);
        setTds(response.data.filter((r) => r.type === "TD")); // Filter for TDs
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  };

  const fetchModules = () => {
    axios
      .get(`${baseUrl}/getAllModuleByProfId/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched Modules:", response.data);
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

  const filteredTds = tds.filter(
    (td) =>
      td.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      td.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTds = filteredTds.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenAddDialog = () => {
    setSelectedTd(null);
    setSelectedModule("");
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (td) => {
    setSelectedTd(td);
    setSelectedModule(td.moduleName);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (td) => {
    setSelectedTd(td);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedTd(null);
    setSelectedModule("");
    setFileName("");
    setUploadProgress(0);
  };

  const handleSave = (tdData, isEdit = false) => {
    const formData = new FormData();

    // Append fields in the required order and with the correct names
    formData.append("nom", tdData.name); // TD name
    formData.append("type", "TD"); // Hardcoded as "TD"

    // Set dataType based on the resource type
    if (tdData.dataType === "VIDEO") {
      formData.append("dataType", "VIDEO"); // Video resource
      formData.append("lien", tdData.url); // Video URL
    } else if (tdData.dataType === "FICHIER") {
      formData.append("dataType", "FICHIER"); // PDF resource
      if (tdData.file) {
        formData.append("data", tdData.file); // PDF file
      }
    }

    // Append moduleId and professorId
    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id); // Module ID
    }
    formData.append("professorId", profId); // Professor ID

    // For editing, append the TD ID
    if (isEdit && tdData.id) {
      formData.append("id", tdData.id);
    }

    // Debugging: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const url = isEdit ? `${baseUrl}/updateResource` : `${baseUrl}/addResource`;

    const method = isEdit ? "put" : "post";

    axios[method](url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    })
      .then((response) => {
        console.log("Resource saved/updated:", response.data);
        toast.success(`TD ${isEdit ? "updated" : "added"} successfully!`);
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        console.error("Error saving/updating resource:", error);
        toast.error("Failed to save/update TD.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/deleteResource/${selectedTd.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Resource deleted:", selectedTd.id);
        toast.success("TD deleted successfully!");
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
        toast.error("Failed to delete TD.");
      });
  };

  return (
    <>
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

      {/* Add TD Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add TD
      </Button>

      {/* Search Box */}
      <TextField
        label="Search TDs"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
        data-aos="fade-down"
      />

      {/* TD Table */}
      <TableContainer component={Paper} sx={{ m: 2 }} data-aos="fade-up">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTds.map((td, index) => (
              <TableRow key={index} data-aos="fade-right">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{td.nom}</TableCell>
                <TableCell>
                  {td.dataType === "VIDEO" ? (
                    <a href={td.lien} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={"http://localhost:8080" + td.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{td.moduleName}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditDialog(td)} color="info" variant="outlined">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(td)}
                    color="secondary" variant="outlined"
                    sx={{ ml: 1 }}
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
        count={filteredTds.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-aos="fade-up"
      />

      {/* Add Dialog */}
      <AddDialog
        open={openAddDialog}
        onClose={handleCloseDialogs}
        onSave={handleSave}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
      />

      {/* Edit Dialog */}
      <EditDialog
        open={openEditDialog}
        onClose={handleCloseDialogs}
        onSave={handleSave}
        td={selectedTd}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
        onDelete={handleDelete}
        td={selectedTd}
      />
    </>
  );
};

// Add Dialog Component
const AddDialog = ({
  open,
  onClose,
  onSave,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
}) => {
  const [tdData, setTdData] = useState({
    name: "",
    dataType: "",
    url: "",
    file: null,
  });

  const handleSave = () => {
    console.log("Saving new TD:", tdData);
    onSave(tdData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTdData({ ...tdData, file });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle
        sx={{
          background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Add TD
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TD Name"
          fullWidth
          value={tdData.name}
          onChange={(e) => setTdData({ ...tdData, name: e.target.value })}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={tdData.dataType}
            onChange={(e) => setTdData({ ...tdData, dataType: e.target.value })}
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {tdData.dataType === "VIDEO" ? (
          <>
            <TextField
              label="Video URL"
              fullWidth
              value={tdData.url}
              onChange={(e) => setTdData({ ...tdData, url: e.target.value })}
              sx={{ }}
            />

            <p style={{ color: "grey", fontSize: "12px" }}>
              exmple: https://www.youtube.com/watch?v=vedioId
            </p>
          </>
        ) : (
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload PDF
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        )}
        {fileName && <Typography>{fileName}</Typography>}
        {uploadProgress > 0 && (
          <LinearProgress variant="determinate" value={uploadProgress} />
        )}
        <Autocomplete
          options={modules}
          getOptionLabel={(option) => option.name}
          value={modules.find((m) => m.name === selectedModule) || null}
          onChange={(e, newValue) => {
            setSelectedModule(newValue ? newValue.name : "");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Module" fullWidth sx={{ mb: 2 }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="outlined" color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Edit Dialog Component
const EditDialog = ({
  open,
  onClose,
  onSave,
  td,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
}) => {
  const [tdData, setTdData] = useState({
    id: td?.id || "",
    name: td?.nom || "",
    dataType: td?.dataType || "",
    url: td?.lien || "",
    file: null,
  });

  useEffect(() => {
    if (td) {
      setTdData({
        id: td.id,
        name: td.nom,
        dataType: td.dataType,
        url: td.lien,
        file: null,
      });
      setSelectedModule(td.moduleName);
      setFileName(""); // Reset file name when opening the dialog
    }
  }, [td]);

  const handleSave = () => {
    console.log("Updating TD:", tdData);
    onSave(tdData, true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTdData({ ...tdData, file });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle
        sx={{
          background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Edit TD
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TD Name"
          fullWidth
          value={tdData.name}
          onChange={(e) => setTdData({ ...tdData, name: e.target.value })}
          sx={{ mb: 2 ,mt:2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={tdData.dataType}
            onChange={(e) => setTdData({ ...tdData, dataType: e.target.value })}
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {tdData.dataType === "VIDEO" ? (
          <TextField
            label="Video URL"
            fullWidth
            value={tdData.url}
            onChange={(e) => setTdData({ ...tdData, url: e.target.value })}
            sx={{ mb: 2 }}
          />
        ) : (
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload PDF
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        )}
        {fileName && <Typography>{fileName}</Typography>}
        {uploadProgress > 0 && (
          <LinearProgress variant="determinate" value={uploadProgress} />
        )}
        <Autocomplete
          options={modules}
          getOptionLabel={(option) => option.name}
          value={modules.find((m) => m.name === selectedModule) || null}
          onChange={(e, newValue) => {
            setSelectedModule(newValue ? newValue.name : "");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Module" fullWidth sx={{ mb: 2 }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info">Cancel</Button>
        <Button onClick={handleSave}  variant="outlined" color="success"  >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

// Delete Dialog Component
const DeleteDialog = ({ open, onClose, onDelete, td }) => {
  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle
        sx={{
          background: "linear-gradient(to right,rgb(171, 0, 0), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 2,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Delete TD
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="error">
          Are you sure you want to delete this TD: <strong>{td?.nom}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info">Cancel</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TDTable;
