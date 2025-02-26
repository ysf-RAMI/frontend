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

const TpTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [tps, setTps] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTp, setSelectedTp] = useState(null);
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
        setTps(response.data.filter((r) => r.type === "TP")); // Filter for TPs
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

  const filteredTps = tps.filter(
    (tp) =>
      tp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tp.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTps = filteredTps.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenAddDialog = () => {
    setSelectedTp(null);
    setSelectedModule("");
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (tp) => {
    setSelectedTp(tp);
    setSelectedModule(tp.moduleName);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (tp) => {
    setSelectedTp(tp);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedTp(null);
    setSelectedModule("");
    setFileName("");
    setUploadProgress(0);
  };

  const handleSave = (tpData, isEdit = false) => {
    const formData = new FormData();

    // Append fields in the required order and with the correct names
    formData.append("nom", tpData.name); // TP name
    formData.append("type", "TP"); // Hardcoded as "TP"

    // Set dataType based on the resource type
    if (tpData.dataType === "VIDEO") {
      formData.append("dataType", "VIDEO"); // Video resource
      formData.append("lien", tpData.url); // Video URL
    } else if (tpData.dataType === "FICHIER") {
      formData.append("dataType", "FICHIER"); // PDF resource
      if (tpData.file) {
        formData.append("data", tpData.file); // PDF file
      }
    }

    // Append moduleId and professorId
    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id); // Module ID
    }
    formData.append("professorId", profId); // Professor ID

    // For editing, append the TP ID
    if (isEdit && tpData.id) {
      formData.append("id", tpData.id);
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
        toast.success(`TP ${isEdit ? "updated" : "added"} successfully!`);
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        console.error("Error saving/updating resource:", error);
        toast.error("Failed to save/update TP.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/deleteResource/${selectedTp.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Resource deleted:", selectedTp.id);
        toast.success("TP deleted successfully!");
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
        toast.error("Failed to delete TP.");
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

      {/* Add TP Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add TP
      </Button>

      {/* Search Box */}
      <TextField
        label="Search TPs"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
        data-aos="fade-down"
      />

      {/* TP Table */}
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
            {paginatedTps.map((tp, index) => (
              <TableRow key={index} data-aos="fade-right">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tp.nom}</TableCell>
                <TableCell>
                  {tp.dataType === "VIDEO" ? (
                    <a href={tp.lien} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={"http://localhost:8080" + tp.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{tp.moduleName}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditDialog(tp)} color="info">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(tp)}
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
        count={filteredTps.length}
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
        tp={selectedTp}
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
        tp={selectedTp}
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
  const [tpData, setTpData] = useState({
    name: "",
    dataType: "",
    url: "",
    file: null,
  });

  const handleSave = () => {
    console.log("Saving new TP:", tpData);
    onSave(tpData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTpData({ ...tpData, file });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle>Add TP</DialogTitle>
      <DialogContent>
        <TextField
          label="TP Name"
          fullWidth
          value={tpData.name}
          onChange={(e) => setTpData({ ...tpData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={tpData.dataType}
            onChange={(e) => setTpData({ ...tpData, dataType: e.target.value })}
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {tpData.dataType === "VIDEO" ? (
          <TextField
            label="Video URL"
            fullWidth
            value={tpData.url}
            onChange={(e) => setTpData({ ...tpData, url: e.target.value })}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

// Edit Dialog Component
const EditDialog = ({
  open,
  onClose,
  onSave,
  tp,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
}) => {
  const [tpData, setTpData] = useState({
    id: tp?.id || "",
    name: tp?.nom || "",
    dataType: tp?.dataType || "",
    url: tp?.lien || "",
    file: null,
  });

  useEffect(() => {
    if (tp) {
      setTpData({
        id: tp.id,
        name: tp.nom,
        dataType: tp.dataType,
        url: tp.lien,
        file: null,
      });
      setSelectedModule(tp.moduleName);
      setFileName(""); // Reset file name when opening the dialog
    }
  }, [tp]);

  const handleSave = () => {
    console.log("Updating TP:", tpData);
    onSave(tpData, true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTpData({ ...tpData, file });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle>Edit TP</DialogTitle>
      <DialogContent>
        <TextField
          label="TP Name"
          fullWidth
          value={tpData.name}
          onChange={(e) => setTpData({ ...tpData, name: e.target.value })}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={tpData.dataType}
            onChange={(e) => setTpData({ ...tpData, dataType: e.target.value })}
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {tpData.dataType === "VIDEO" ? (
          <TextField
            label="Video URL"
            fullWidth
            value={tpData.url}
            onChange={(e) => setTpData({ ...tpData, url: e.target.value })}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

// Delete Dialog Component
const DeleteDialog = ({ open, onClose, onDelete, tp }) => {
  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle>Delete TP</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this TP: <strong>{tp?.nom}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TpTable;
