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
} from "@mui/material";
import { useContext, useState } from "react";
import moduleContext from "../../Context/ModuleContext";

const CorsTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add", "edit", "delete"
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [courseData, setCourseData] = useState({
    id: null,
    name: "",
    type: "",
    url: "",
  });

  const courses = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.courses.map((course) => ({
        ...course,
        moduleName: module.name,
        filiereName: f.name,
      }))
    )
  );

  const handleOpenDialog = (type, course = null) => {
    setDialogType(type);
    if (course) {
      setCourseData({
        id: course.id,
        name: course.name,
        type: course.type,
        url: course.url,
      });
      setSelectedFiliere(course.filiereName);
      setSelectedModule(course.moduleName);
    } else {
      setCourseData({ id: null, name: "", type: "", url: "" });
      setSelectedFiliere("");
      setSelectedModule("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCourseData({ id: null, name: "", type: "", url: "" });
  };

  const handleSave = () => {
    setFiliere((prevFiliere) =>
      prevFiliere.map((f) => {
        if (f.name === selectedFiliere) {
          return {
            ...f,
            modules: f.modules.map((m) => {
              if (m.name === selectedModule) {
                return {
                  ...m,
                  courses:
                    dialogType === "edit"
                      ? m.courses.map((c) =>
                          c.id === courseData.id ? { ...courseData } : c
                        )
                      : [...m.courses, { ...courseData, id: Date.now() }],
                };
              }
              return m;
            }),
          };
        }
        return f;
      })
    );
    handleCloseDialog();
  };

  const handleDelete = () => {
    setFiliere((prevFiliere) =>
      prevFiliere.map((f) => ({
        ...f,
        modules: f.modules.map((m) => ({
          ...m,
          courses: m.courses.filter((c) => c.id !== courseData.id),
        })),
      }))
    );
    handleCloseDialog();
  };

  return (
    <>
      {/* Add Course Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ m: 2 }}
      >
        Add Course
      </Button>

      {/* Course Table */}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Filière</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.type}</TableCell>
                <TableCell>
                  {course.type === "video" ? (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{course.moduleName}</TableCell>
                <TableCell>{course.filiereName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog("edit", course)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog("delete", course)}
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

      {/* Add/Edit/Delete Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === "delete"
            ? "Delete Course"
            : dialogType === "edit"
            ? "Edit Course"
            : "Add Course"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "delete" ? (
            <DialogContentText>
              Are you sure you want to delete this course?
            </DialogContentText>
          ) : (
            <>
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
                  value={courseData.type}
                  onChange={(e) =>
                    setCourseData({ ...courseData, type: e.target.value })
                  }
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                </Select>
              </FormControl>
              {courseData.type === "video" ? (
                <TextField
                  label="Video URL"
                  fullWidth
                  value={courseData.url}
                  onChange={(e) =>
                    setCourseData({ ...courseData, url: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              ) : (
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload PDF
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        url: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </Button>
              )}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filière</InputLabel>
                <Select
                  value={selectedFiliere}
                  onChange={(e) => setSelectedFiliere(e.target.value)}
                >
                  {filiere.map((f) => (
                    <MenuItem key={f.name} value={f.name}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Module</InputLabel>
                <Select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                >
                  {filiere
                    .find((f) => f.name === selectedFiliere)
                    ?.modules.map((m) => (
                      <MenuItem key={m.name} value={m.name}>
                        {m.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogType === "delete" ? (
            <Button onClick={handleDelete}>Delete</Button>
          ) : (
            <Button onClick={handleSave}>Save</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CorsTable;