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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ExamTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [exams, setExams] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false); // State for PDF dialog
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      toast.error("Failed to fetch data.");
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
      setExams(response.data.filter((r) => r.type === "EXAM"));
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

  const filteredExams = exams.filter(
    (exam) =>
      exam.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedExams = filteredExams.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenAddDialog = () => {
    setSelectedExam(null);
    setSelectedModule("");
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (exam) => {
    setSelectedExam(exam);
    setSelectedModule(exam.moduleName);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (exam) => {
    setSelectedExam(exam);
    setOpenDeleteDialog(true);
  };

  const handleOpenPdfDialog = (exam) => {
    setSelectedExam(exam);
    setOpenPdfDialog(true); // Open PDF dialog
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenPdfDialog(false); // Close PDF dialog
    setSelectedExam(null);
    setSelectedModule("");
    setFileName("");
    setUploadProgress(0);
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add Exam
      </Button>

      <TextField
        label="Search Exams"
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
            {paginatedExams.map((exam, index) => (
              <TableRow key={index} data-aos="fade-right">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{exam.nom}</TableCell>
                <TableCell>
                  {exam.dataType === "VIDEO" ? (
                    <a
                      href={exam.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenPdfDialog(exam)} // Open PDF dialog
                    >
                      View PDF
                    </Button>
                  )}
                </TableCell>
                <TableCell>{exam.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(exam)}
                    color="info"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(exam)}
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
        count={filteredExams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-aos="fade-up"
      />

      <ExamFormDialog
        open={openAddDialog}
        onClose={handleCloseDialogs}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
        profId={profId}
        mode="add"
      />

      <ExamFormDialog
        open={openEditDialog}
        onClose={handleCloseDialogs}
        exam={selectedExam}
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        fileName={fileName}
        setFileName={setFileName}
        uploadProgress={uploadProgress}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
        profId={profId}
        mode="edit"
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
        exam={selectedExam}
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
          View PDF: {selectedExam?.nom}
        </DialogTitle>
        <DialogContent>
          <iframe
            src={`${baseUrl}/api/files/getFile/${selectedExam?.lien}`}
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

const ExamFormDialog = ({
  open,
  onClose,
  exam,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
  fetchResources,
  baseUrl,
  token,
  profId,
  mode,
}) => {
  // Initialize state with default values
  const [examData, setExamData] = useState({
    id: "",
    name: "",
    dataType: "",
    lien: "",
    file: null,
  });

  // Reset state when the dialog is opened or when the exam prop changes
  useEffect(() => {
    if (mode === "add") {
      // Reset state for adding a new exam
      setExamData({
        id: "",
        name: "",
        dataType: "",
        lien: "",
        file: null,
      });
      setSelectedModule("");
      setFileName("");
    } else if (exam) {
      // Set state for editing an existing exam
      setExamData({
        id: exam.id,
        name: exam.nom,
        dataType: exam.dataType,
        lien: exam.lien,
        file: null,
      });
      setSelectedModule(exam.moduleName);
      setFileName("");
    }
  }, [open, exam, mode]); // Reset when the dialog opens or the exam prop changes

  const handleSave = async () => {
    if (
      !examData.name ||
      !selectedModule ||
      (examData.dataType === "VIDEO" && !examData.lien) ||
      (examData.dataType === "FICHIER" && !examData.file)
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", examData.id);
    formData.append("nom", examData.name);
    formData.append("type", "EXAM");
    formData.append("dataType", examData.dataType);

    if (examData.dataType === "VIDEO") {
      formData.append("lien", examData.lien);
    } else if (examData.dataType === "FICHIER") {
      formData.append("data", examData.file);
    }

    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id);
    }
    formData.append("professorId", profId);

    try {
      const url =
        mode === "add"
          ? `${baseUrl}/api/professeur/addResource`
          : `${baseUrl}/api/professeur/updateResource`;
      const method = mode === "add" ? "post" : "put";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `Exam ${mode === "add" ? "added" : "updated"} successfully!`
      );
      fetchResources();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} exam.`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExamData({ ...examData, file });
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
        {mode === "add" ? "Add Exam" : "Edit Exam"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Exam Name"
          fullWidth
          value={examData.name}
          onChange={(e) => setExamData({ ...examData, name: e.target.value })}
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={examData.dataType}
            onChange={(e) =>
              setExamData({ ...examData, dataType: e.target.value })
            }
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {examData.dataType === "VIDEO" ? (
          <>
            <TextField
              label="Video URL"
              fullWidth
              value={examData.lien}
              onChange={(e) =>
                setExamData({ ...examData, lien: e.target.value })
              }
              sx={{}}
            />
            <p style={{ color: "grey", fontSize: "12px" }}>
              exmple: https://www.youtube.com/watch?v=vedioId
            </p>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload PDF
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {fileName && <Typography>{fileName}</Typography>}
            {uploadProgress > 0 && (
              <LinearProgress variant="determinate" value={uploadProgress} />
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
          renderInput={(params) => (
            <TextField {...params} label="Module" fullWidth sx={{ mb: 2 }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success" variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({
  open,
  onClose,
  exam,
  fetchResources,
  baseUrl,
  token,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/professeur/deleteResource/${exam.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Exam deleted successfully!");
      fetchResources();
      onClose();
    } catch (error) {
      toast.error("Failed to delete exam.");
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
        Delete Exam
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="error" sx={{ mt: 2 }}>
          Are you sure you want to delete this exam:{" "}
          <strong>{exam?.nom}</strong>?
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

export default ExamTable;
