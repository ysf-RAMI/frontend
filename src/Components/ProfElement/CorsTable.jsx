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
import "aos/dist/aos.css"; // Import AOS styles

const CorsTable = () => {
  const [resource, setResource] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [modules, setModules] = useState([]);
  const [cors, setCors] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchResources(), fetchFilieres(), fetchModules()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllResources/${profId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResource(response.data);
      setCors(response.data.filter((r) => r.type === "COURS"));
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to fetch resources.");
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllFiliere`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilieres(response.data);
    } catch (error) {
      console.error("Error fetching filieres:", error);
      toast.error("Failed to fetch filieres.");
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getAllModuleByProfId/${profId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules.");
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

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
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

      {/* Add Course Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Add Course
      </Button>

      {/* Search Box */}
      <TextField
        label="Search Courses"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
        data-aos="fade-down"
      />

      {/* Course Table */}
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
                      component="a"
                      href={"http://localhost:8080" + course.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{course.moduleName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(course)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(course)}
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
        count={filteredCors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-aos="fade-up"
      />

      {/* Add Dialog */}
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

      {/* Edit Dialog */}
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

      {/* Delete Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
        course={selectedCourse}
        fetchResources={fetchResources}
        baseUrl={baseUrl}
        token={token}
      />
    </>
  );
};

// Reusable Course Form Dialog
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
        mode === "add" ? `${baseUrl}/addResource` : `${baseUrl}/updateResource`;
      const method = mode === "add" ? "post" : "put";

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

      toast.success(
        `Course ${mode === "add" ? "added" : "updated"} successfully!`
      );
      fetchResources();
      onClose();
    } catch (error) {
      console.error(
        `Error ${mode === "add" ? "adding" : "updating"} resource:`,
        error
      );
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
      <DialogTitle>{mode === "add" ? "Add Course" : "Edit Course"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Course Name"
          fullWidth
          value={courseData.name}
          onChange={(e) =>
            setCourseData({ ...courseData, name: e.target.value })
          }
          sx={{ mb: 2 }}
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
          <TextField
            label="Video URL"
            fullWidth
            value={courseData.lien}
            onChange={(e) =>
              setCourseData({ ...courseData, lien: e.target.value })
            }
            sx={{ mb: 2 }}
          />
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

// Delete Dialog Component
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
      await axios.delete(`${baseUrl}/deleteResource/${course.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course deleted successfully!");
      fetchResources();
      onClose();
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete course.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} data-aos="zoom-in">
      <DialogTitle>Delete Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this course:{" "}
          <strong>{course?.nom}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CorsTable;
