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

const TpTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [tps, setTps] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [selectedTp, setSelectedTp] = useState(null);
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
        setTps(response.data.filter((r) => r.type === "TP")); // Filter for TPs
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
    setFileName("");
    setUploadProgress(0);
    setIsUploading(false);
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (tp) => {
    setSelectedTp(tp);
    setSelectedModule(tp.moduleName);
    setFileName("");
    setUploadProgress(0);
    setIsUploading(false);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (tp) => {
    setSelectedTp(tp);
    setOpenDeleteDialog(true);
  };

  const handleOpenPdfDialog = (tp) => {
    setSelectedTp(tp);
    setOpenPdfDialog(true);
  };

  const handleCloseDialogs = () => {
    if (!isUploading) {
      setOpenAddDialog(false);
      setOpenEditDialog(false);
      setOpenDeleteDialog(false);
      setOpenPdfDialog(false);
      setSelectedTp(null);
      setSelectedModule("");
      setFileName("");
      setUploadProgress(0);
    } else {
      toast.warning("Please wait until upload is complete");
    }
  };

  const handleSave = async (tpData, isEdit = false) => {
    if (
      !tpData.name ||
      !selectedModule ||
      (tpData.dataType === "VIDEO" && !tpData.url) ||
      (tpData.dataType === "FICHIER" && !tpData.file && !isEdit)
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Start the upload process
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("nom", tpData.name);
    formData.append("type", "TP");
    formData.append("dataType", tpData.dataType);

    if (tpData.dataType === "VIDEO") {
      formData.append("lien", tpData.url);
    } else if (tpData.dataType === "FICHIER" && tpData.file) {
      formData.append("data", tpData.file);
    }

    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id);
    }
    formData.append("professorId", profId);

    if (isEdit && tpData.id) {
      formData.append("id", tpData.id);
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

      toast.success(`TP ${isEdit ? "updated" : "added"} successfully!`);
      fetchResources();
      handleCloseDialogs();
    } catch (error) {
      toast.error(`Failed to ${isEdit ? "update" : "add"} TP.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/api/professeur/deleteResource/${selectedTp.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("TP deleted successfully!");
        fetchResources();
        handleCloseDialogs();
      })
      .catch((error) => {
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

      <Box sx={{ display: "flex" ,justifyContent:"space-between"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          sx={{ m: 2 }}
          data-aos="fade-down"
        >
          Add TP
        </Button>

        <TextField
          label="Search TPs"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ m: 2, width: "300px" }}
          data-aos="fade-down"
        />
      </Box>

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
                      onClick={() => handleOpenPdfDialog(tp)}
                    >
                      View PDF
                    </Button>
                  )}
                </TableCell>
                <TableCell>{tp.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(tp)}
                    color="info"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(tp)}
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
        count={filteredTps.length}
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
        tp={selectedTp}
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
        tp={selectedTp}
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
          View PDF: {selectedTp?.nom}
        </DialogTitle>
        <DialogContent>
          <iframe
            src={`${baseUrl}/api/files/getFile/${selectedTp?.lien}`}
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
  const [tpData, setTpData] = useState({
    name: "",
    dataType: "",
    url: "",
    file: null,
  });

  const handleSave = () => {
    if (!tpData.name || !tpData.dataType || (!tpData.url && !tpData.file)) {
      toast.error("Please fill all required fields.");
      return;
    }

    onSave(tpData);
    setTpData({ name: "", dataType: "", url: "", file: null });
    setFileName("");
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
        Add TP
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TP Name"
          fullWidth
          value={tpData.name}
          onChange={(e) => setTpData({ ...tpData, name: e.target.value })}
          disabled={isUploading}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }} disabled={isUploading}>
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
          <>
            <TextField
              label="Video URL"
              fullWidth
              value={tpData.url}
              onChange={(e) => setTpData({ ...tpData, url: e.target.value })}
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
  tp,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
  isUploading,
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
      setFileName("");
    }
  }, [tp]);

  const handleSave = () => {
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
        Edit TP
      </DialogTitle>
      <DialogContent>
        <TextField
          label="TP Name"
          fullWidth
          value={tpData.name}
          onChange={(e) => setTpData({ ...tpData, name: e.target.value })}
          disabled={isUploading}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }} disabled={isUploading}>
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

const DeleteDialog = ({ open, onClose, onDelete, tp }) => {
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
        Delete TP
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="error">
          Are you sure you want to delete this TP: <strong>{tp?.nom}</strong>?
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

export default TpTable;
