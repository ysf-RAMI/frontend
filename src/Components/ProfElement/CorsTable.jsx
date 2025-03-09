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

const CorsTable = () => {
  const [resource, setResource] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [modules, setModules] = useState([]);
  const [cors, setCors] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false); // State for PDF dialog
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const baseUrl = "http://localhost:8080";
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
      await Promise.all([fetchResources(), fetchFilieres(), fetchModules()]);
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
      setCors(response.data.filter((r) => r.type === "COURS"));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/professeur/getAllFiliere`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFilieres(response.data);
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

  const filteredCors = cors.filter(
    (course) =>
      course.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCors = filteredCors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenAddDialog = () => {
    setSelectedCourse(null);
    setSelectedModule("");
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (course) => {
    setSelectedCourse(course);
    setSelectedModule(course.moduleName);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (course) => {
    setSelectedCourse(course);
    setOpenDeleteDialog(true);
  };

  const handleOpenPdfDialog = (course) => {
    setSelectedCourse(course);
    setOpenPdfDialog(true); // Open PDF dialog
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenPdfDialog(false); // Close PDF dialog
    setSelectedCourse(null);
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
        Add Course
      </Button>

      <TextField
        label="Search Courses"
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
            {paginatedCors.map((course, index) => (
              <TableRow key={index} data-aos="fade-right">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.nom}</TableCell>
                <TableCell>
                  {course.dataType === "VIDEO" ? (
                    <a
                      href={course.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenPdfDialog(course)} // Open PDF dialog
                    >
                      View PDF
                    </Button>
                  )}
                </TableCell>
                <TableCell>{course.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(course)}
                    color="info"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(course)}
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
        count={filteredCors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-aos="fade-up"
      />

      <CourseFormDialog
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

      <CourseFormDialog
        open={openEditDialog}
        onClose={handleCloseDialogs}
        course={selectedCourse}
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
        course={selectedCourse}
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
          View PDF: {selectedCourse?.nom}
        </DialogTitle>
        <DialogContent>
          <iframe
            src={`http://localhost:8080/api/files/getFile/${selectedCourse?.lien}#toolbar=0`}
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

const CourseFormDialog = ({
  open,
  onClose,
  course,
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
  const [courseData, setCourseData] = useState({
    id: course?.id || "",
    name: course?.nom || "",
    dataType: course?.dataType || "",
    lien: course?.lien || "",
    file: null,
  });

  useEffect(() => {
    if (course) {
      setCourseData({
        id: course.id,
        name: course.nom,
        dataType: course.dataType,
        lien: course.lien,
        file: null,
      });
      setSelectedModule(course.moduleName);
      setFileName("");
    }
  }, [course]);

  const handleSave = async () => {
    if (
      !courseData.name ||
      !selectedModule ||
      (courseData.dataType === "VIDEO" && !courseData.lien) ||
      (courseData.dataType === "FICHIER" && !courseData.file)
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", courseData.id);
    formData.append("nom", courseData.name);
    formData.append("type", "COURS");
    formData.append("dataType", courseData.dataType);

    if (courseData.dataType === "VIDEO") {
      formData.append("lien", courseData.lien);
    } else if (courseData.dataType === "FICHIER") {
      formData.append("data", courseData.file);
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
        `Course ${mode === "add" ? "added" : "updated"} successfully!`
      );
      fetchResources();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} course.`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, file });
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
        {mode === "add" ? "Add Course" : "Edit Course"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Course Name"
          fullWidth
          value={courseData.name}
          onChange={(e) =>
            setCourseData({ ...courseData, name: e.target.value })
          }
          sx={{ mb: 2, mt: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={courseData.dataType}
            onChange={(e) =>
              setCourseData({ ...courseData, dataType: e.target.value })
            }
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="FICHIER">PDF</MenuItem>
          </Select>
        </FormControl>
        {courseData.dataType === "VIDEO" ? (
          <>
            <TextField
              label="Video URL"
              fullWidth
              value={courseData.lien}
              onChange={(e) =>
                setCourseData({ ...courseData, lien: e.target.value })
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
  course,
  fetchResources,
  baseUrl,
  token,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/professeur/deleteResource/${course.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Course deleted successfully!");
      fetchResources();
      onClose();
    } catch (error) {
      toast.error("Failed to delete course.");
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
        Delete Course
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="error" sx={{ mt: 2 }}>
          Are you sure you want to delete this course:{" "}
          <strong>{course?.nom}</strong>?
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

export default CorsTable;
