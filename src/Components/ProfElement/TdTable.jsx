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
  Box,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const TDTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [tds, setTds] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [selectedTd, setSelectedTd] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUploading, setIsUploading] = useState(false); // State to track upload status

  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const profId = localStorage.getItem("profId");

  useEffect(() => {
    AOS.init({
      duration: 200,
      once: true,
    });
  }, []);

  useEffect(() => {
    fetchResources();
    fetchModules();
  }, []);

  const fetchResources = () => {
    axios
      .get(`${baseUrl}/api/professeur/getAllResources/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setResource(response.data);
        setTds(response.data.filter((r) => r.type === "TD"));
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  };

  const fetchModules = () => {
    axios
      .get(`${baseUrl}/api/professeur/getAllModuleByProfId/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
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
    setFileName("");
    setUploadProgress(0);
    setIsUploading(false);
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (td) => {
    setSelectedTd(td);
    setSelectedModule(td.moduleName);
    setFileName("");
    setUploadProgress(0);
    setIsUploading(false);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (td) => {
    setSelectedTd(td);
    setOpenDeleteDialog(true);
  };

  const handleOpenPdfDialog = (td) => {
    setSelectedTd(td);
    setOpenPdfDialog(true);
  };

  const handleCloseDialogs = () => {
    if (!isUploading) {
      setOpenAddDialog(false);
      setOpenEditDialog(false);
      setOpenDeleteDialog(false);
      setOpenPdfDialog(false);
      setSelectedTd(null);
      setSelectedModule("");
      setFileName("");
      setUploadProgress(0);
    } else {
      toast.warning("Please wait until upload is complete");
    }
  };

  const handleSave = async (tdData, isEdit = false) => {
    if (
      !tdData.name ||
      !selectedModule ||
      (tdData.dataType === "VIDEO" && !tdData.url) ||
      (tdData.dataType === "FICHIER" && !tdData.file && !isEdit)
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Start the upload process
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("nom", tdData.name);
    formData.append("type", "TD");
    formData.append("dataType", tdData.dataType);

    if (tdData.dataType === "VIDEO") {
      formData.append("lien", tdData.url);
    } else if (tdData.dataType === "FICHIER" && tdData.file) {
      formData.append("data", tdData.file);
    }

    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id);
    }
    formData.append("professorId", profId);

    if (isEdit && tdData.id) {
      formData.append("id", tdData.id);
    }

    const url = isEdit
      ? `${baseUrl}/api/professeur/updateResource`
      : `${baseUrl}/api/professeur/addResource`;

    const method = isEdit ? "put" : "post";

    try {
      await axios[method](url, formData, {
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
      });

      toast.success(`TD ${isEdit ? "updated" : "added"} successfully!`);
      fetchResources();
      handleCloseDialogs();
    } catch (error) {
      toast.error(`Failed to ${isEdit ? "update" : "add"} TD.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/api/professeur/deleteResource/${selectedTd.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("TD deleted successfully!");
        fetchResources();
        handleCloseDialogs();
      })
      .catch((error) => {
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add TD
      </Button>

      <TextField
        label="Search TDs"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
        data-aos="fade-down"
      />

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
                      onClick={() => handleOpenPdfDialog(td)}
                    >
                      View PDF
                    </Button>
                  )}
                </TableCell>
                <TableCell>{td.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(td)}
                    color="info"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(td)}
                    color="secondary"
                    variant="outlined"
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
        isUploading={isUploading}
      />

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
        isUploading={isUploading}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
        onDelete={handleDelete}
        td={selectedTd}
      />

      {/* PDF Dialog */}
      <Dialog
        open={openPdfDialog}
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="md"
        data-aos="zoom-in"
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
          View PDF: {selectedTd?.nom}
        </DialogTitle>
        <DialogContent>
          <iframe
            src={`${baseUrl}/api/files/getFile/${selectedTd?.lien}`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            title="PDF Viewer"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} variant="outlined" color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

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
  isUploading,
}) => {
  const [tdData, setTdData] = useState({
    name: "",
    dataType: "",
    url: "",
    file: null,
  });

  const handleSave = () => {
    if (!tdData.name || !tdData.dataType || (!tdData.url && !tdData.file)) {
      toast.error("Please fill all required fields.");
      return;
    }

    onSave(tdData);
    setTdData({ name: "", dataType: "", url: "", file: null });
    setFileName("");
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
    <Dialog
      open={open}
      onClose={onClose}
      data-aos="zoom-in"
      disableEscapeKeyDown={isUploading}
      disableBackdropClick={isUploading}
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
        Add TD
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TD Name"
          fullWidth
          value={tdData.name}
          onChange={(e) => setTdData({ ...tdData, name: e.target.value })}
          disabled={isUploading}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }} disabled={isUploading}>
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
              disabled={isUploading}
              sx={{ mb: 2 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Example: https://www.youtube.com/watch?v=videoId
            </Typography>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 1 }}
              disabled={isUploading}
              color={fileName ? "success" : "primary"}
            >
              {fileName ? "Change PDF" : "Upload PDF"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="application/pdf"
                disabled={isUploading}
              />
            </Button>
            {fileName && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Selected file: <Chip label={fileName} color="primary" />
              </Typography>
            )}
            {uploadProgress > 0 && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
          </>
        )}
        <Autocomplete
          options={modules}
          getOptionLabel={(option) => option.name}
          value={modules.find((m) => m.name === selectedModule) || null}
          onChange={(e, newValue) => {
            setSelectedModule(newValue ? newValue.name : "");
          }}
          disabled={isUploading}
          renderInput={(params) => (
            <TextField {...params} label="Module" fullWidth sx={{ mb: 2 }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="info"
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="success"
          disabled={isUploading}
        >
          Save
        </Button>
      </DialogActions>
      {isUploading && (
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "medium" }}
          >
            Please wait while your file uploads. Do not close this dialog.
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};

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
  isUploading,
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
      setFileName("");
    }
  }, [td]);

  const handleSave = () => {
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
    <Dialog
      open={open}
      onClose={onClose}
      data-aos="zoom-in"
      disableEscapeKeyDown={isUploading}
      disableBackdropClick={isUploading}
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
        Edit TD
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TD Name"
          fullWidth
          value={tdData.name}
          onChange={(e) => setTdData({ ...tdData, name: e.target.value })}
          disabled={isUploading}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }} disabled={isUploading}>
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
            disabled={isUploading}
            sx={{ mb: 2 }}
          />
        ) : (
          <>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 1 }}
              disabled={isUploading}
              color={fileName ? "success" : "primary"}
            >
              {fileName ? "Change PDF" : "Upload PDF"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="application/pdf"
                disabled={isUploading}
              />
            </Button>
            {fileName && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Selected file: <Chip label={fileName} color="primary" />
              </Typography>
            )}
            {uploadProgress > 0 && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
          </>
        )}
        <Autocomplete
          options={modules}
          getOptionLabel={(option) => option.name}
          value={modules.find((m) => m.name === selectedModule) || null}
          onChange={(e, newValue) => {
            setSelectedModule(newValue ? newValue.name : "");
          }}
          disabled={isUploading}
          renderInput={(params) => (
            <TextField {...params} label="Module" fullWidth sx={{ mb: 2 }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="info"
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="success"
          disabled={isUploading}
        >
          Save
        </Button>
      </DialogActions>
      {isUploading && (
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "medium" }}
          >
            Please wait while your file uploads. Do not close this dialog.
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};

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
        <Button onClick={onClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TDTable;
