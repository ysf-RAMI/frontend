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

const ExamTable = () => {
  const [resource, setResource] = useState([]);
  const [modules, setModules] = useState([]);
  const [exams, setExams] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const baseUrl = "http://localhost:8080";
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const profId = localStorage.getItem("profId");

  useEffect(() => {
    AOS.init({
      duration: 220,
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
        setExams(response.data.filter((r) => r.type === "EXAM"));
      })
      .catch((error) => {
        toast.error("Error while downloading Exams");
      });
  };

  const fetchModules = () => {
    axios
      .get(`${baseUrl}/api/professeur/getAllModuleByProfId/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setModules(response.data);
      });
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

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedExam(null);
    setSelectedModule("");
    setFileName("");
    setUploadProgress(0);
  };

  const handleSave = (examData, isEdit = false) => {
    const formData = new FormData();

    formData.append("nom", examData.name);
    formData.append("type", "EXAM");

    if (examData.dataType === "VIDEO") {
      formData.append("dataType", "VIDEO");
      formData.append("lien", examData.url);
    } else if (examData.dataType === "FICHIER") {
      formData.append("dataType", "FICHIER");
      if (examData.file) {
        formData.append("data", examData.file);
      }
    }

    const selectedModuleObj = modules.find((m) => m.name === selectedModule);
    if (selectedModuleObj) {
      formData.append("moduleId", selectedModuleObj.id);
    }
    formData.append("professorId", profId);

    if (isEdit && examData.id) {
      formData.append("id", examData.id);
    }

    const url = isEdit
      ? `${baseUrl}/api/professeur/updateResource`
      : `${baseUrl}/api/professeur/addResource`;

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
        toast.success(`Exam ${isEdit ? "updated" : "added"} successfully!`);
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        toast.error("Failed to save/update exam.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/deleteResource/${selectedExam.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Exam deleted successfully!");
        fetchResources(); // Refresh the resource list
        handleCloseDialogs();
      })
      .catch((error) => {
        toast.error("Failed to delete exam.");
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

      {/* Add Exam Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add Exam
      </Button>

      {/* Search Box */}
      <TextField
        label="Search Exams"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 1, width: "300px" }}
        data-aos="fade-down"
      />

      {/* Exam Table */}
      <TableContainer component={Paper} sx={{ m: 1 }} data-aos="fade-up">
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
                      component="a"
                      href={"http://localhost:8080" + exam.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{exam.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(exam)}
                    color="info"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(exam)}
                    color="secondary"
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

      {/* Pagination */}
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
        exam={selectedExam}
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
        exam={selectedExam}
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
  const [examData, setExamData] = useState({
    name: "",
    dataType: "",
    url: "",
    file: null,
  });

  const handleSave = () => {
    toast.success("Saving new exam:");
    onSave(examData);
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
        Add Exam
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Exam Name"
          fullWidth
          value={examData.name}
          onChange={(e) => setExamData({ ...examData, name: e.target.value })}
          sx={{ mt: 2, mb: 2 }}
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
            {" "}
            <TextField
              label="Video URL"
              fullWidth
              value={examData.url}
              onChange={(e) =>
                setExamData({ ...examData, url: e.target.value })
              }
              sx={{}}
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
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          sx={{ color: "white", backgroundColor: "#01162e" }}
        >
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
  exam,
  modules,
  selectedModule,
  setSelectedModule,
  fileName,
  setFileName,
  uploadProgress,
}) => {
  const [examData, setExamData] = useState({
    id: exam?.id || "",
    name: exam?.nom || "",
    dataType: exam?.dataType || "",
    url: exam?.lien || "",
    file: null,
  });

  useEffect(() => {
    if (exam) {
      setExamData({
        id: exam.id,
        name: exam.nom,
        dataType: exam.dataType,
        url: exam.lien,
        file: null,
      });
      setSelectedModule(exam.moduleName);
      setFileName(""); // Reset file name when opening the dialog
    }
  }, [exam]);

  const handleSave = () => {
    toast.success("Updating exam:");
    onSave(examData, true);
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
        Edit Exam
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Exam Name"
          fullWidth
          value={examData.name}
          onChange={(e) => setExamData({ ...examData, name: e.target.value })}
          sx={{ mt: 2, mb: 2 }}
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
          <TextField
            label="Video URL"
            fullWidth
            value={examData.url}
            onChange={(e) => setExamData({ ...examData, url: e.target.value })}
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

// eslint-disable-next-line react/prop-types
const DeleteDialog = ({ open, onClose, onDelete, exam }) => {
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
        <DialogContentText color="error">
          Are you sure you want to delete this exam:{" "}
          <strong>{exam?.nom}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamTable;
