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
  CircularProgress,
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
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchResources(), fetchModules()]);
    } catch (error) {
      console.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/professeur/getAllResources/${profId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResource(response.data);
      setTds(response.data.filter((r) => r.type === "TD"));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/professeur/getAllModuleByProfId/${profId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModules(response.data);
    } catch (error) {
      console.error(error);
    }
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
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          data-aos="fade-down"
        >
          Add TD
        </Button>

        <TextField
          label="Search TDs"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "300px" }}
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
                    sx={{ ml: 1 }}
                    variant="outlined"
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

      <TDFormDialog
        open={openAddDialog}
        onClose={handleCloseDialogs}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
        profId={profId}
        mode="add"
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />

      <TDFormDialog
        open={openEditDialog}
        onClose={handleCloseDialogs}
        td={selectedTd}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
        profId={profId}
        mode="edit"
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
        td={selectedTd}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
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

const TDFormDialog = ({
  open,
  onClose,
  td,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
  setUploadProgress,
  fetchResources,
  baseUrl,
  token,
  profId,
  mode,
  isUploading,
  setIsUploading,
}) => {
  const [tdData, setTdData] = useState({
    id: td?.id || "",
    name: td?.nom || "",
    dataType: td?.dataType || "",
    lien: td?.lien || "",
    file: null,
  });
  const [uploadState, setUploadState] = useState("idle");

  useEffect(() => {
    if (td) {
      setTdData({
        id: td.id,
        name: td.nom,
        dataType: td.dataType,
        lien: td.lien,
        file: null,
      });
      setSelectedModule(td.moduleName);
      setFileName("");
      setUploadState("idle");
    }
  }, [td]);

  const handleSave = async () => {
    if (
      !tdData.name ||
      !selectedModule ||
      (tdData.dataType === "VIDEO" && !tdData.lien) ||
      (tdData.dataType === "FICHIER" && !tdData.file && mode === "add")
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsUploading(true);
    setUploadState("preparing");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("id", tdData.id);
    formData.append("nom", tdData.name);
    formData.append("type", "TD");
    formData.append("dataType", tdData.dataType);

    if (tdData.dataType === "VIDEO") {
      formData.append("lien", tdData.lien);
    } else if (tdData.dataType === "FICHIER" && tdData.file) {
      formData.append("data", tdData.file);
    }

    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id);
    }
    formData.append("professorId", profId);

    try {
      setTimeout(() => {
        setUploadState("uploading");
      }, 500);

      const url =
        mode === "add"
          ? `${baseUrl}/api/professeur/addResource`
          : `${baseUrl}/api/professeur/updateResource`;
      const method = mode === "add" ? "post" : "put";

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      };

      await axios[method](url, formData, config);

      setUploadState("complete");
      setTimeout(() => {
        toast.success(
          `TD ${mode === "add" ? "added" : "updated"} successfully!`
        );
        fetchResources();
        setIsUploading(false);
        onClose();
      }, 500);
    } catch (error) {
      setUploadState("error");
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} TD.`);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.warning("File size should be less than 50MB");
        return;
      }

      if (file.type !== "application/pdf") {
        toast.warning("Only PDF files are allowed");
        return;
      }

      setTdData({ ...tdData, file });
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const renderUploadStatus = () => {
    if (tdData.dataType !== "FICHIER") return null;

    switch (uploadState) {
      case "idle":
        return (
          fileName && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Chip
                  label={fileName}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                Selected file
              </Typography>
            </Box>
          )
        );
      case "preparing":
        return (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
              Preparing to upload...
            </Typography>
            <LinearProgress variant="indeterminate" />
          </Box>
        );
      case "uploading":
        return (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="primary">
                Uploading...
              </Typography>
              <Typography variant="body2" color="primary">
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        );
      case "complete":
        return (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
              Upload complete!
            </Typography>
            <LinearProgress variant="determinate" value={100} color="success" />
          </Box>
        );
      case "error":
        return (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
              Upload failed. Please try again.
            </Typography>
            <LinearProgress variant="determinate" value={100} color="error" />
          </Box>
        );
      default:
        return null;
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
        {mode === "add" ? "Add TD" : "Edit TD"}
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
              value={tdData.lien}
              onChange={(e) => setTdData({ ...tdData, lien: e.target.value })}
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

            {renderUploadStatus()}

            {mode === "edit" && !tdData.file && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                {tdData.file
                  ? "New file will replace current PDF"
                  : "Leave empty to keep current PDF"}
              </Typography>
            )}
          </>
        )}
        <Autocomplete
          options={modules}
          getOptionLabel={(option) => option.name}
          value={modules.find((m) => m.name === selectedModule) || null}
          onChange={(e, newValue) =>
            setSelectedModule(newValue ? newValue.name : "")
          }
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
          color="success"
          variant="outlined"
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

const DeleteDialog = ({
  open,
  onClose,
  td,
  fetchResources,
  baseUrl,
  token,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/api/professeur/deleteResource/${td.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("TD deleted successfully!");
      fetchResources();
      onClose();
    } catch (error) {
      toast.error("Failed to delete TD.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle
        sx={{
          background: "linear-gradient(to right,rgb(171, 0, 0), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Delete TD
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="error" sx={{ mt: 2 }}>
          Are you sure you want to delete this TD: <strong>{td?.nom}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TDTable;
