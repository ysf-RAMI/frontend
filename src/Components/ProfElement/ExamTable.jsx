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

const ExamTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add", "edit", "delete"
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [examData, setExamData] = useState({
    id: null,
    name: "",
    type: "",
    url: "",
  });

  const exams = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.EXAMS.map((exam) => ({
        ...exam,
        moduleName: module.name,
        filiereName: f.name,
      }))
    )
  );

  const handleOpenDialog = (type, exam = null) => {
    setDialogType(type);
    if (exam) {
      setExamData({
        id: exam.id,
        name: exam.name,
        type: exam.type,
        url: exam.url,
      });
      setSelectedFiliere(exam.filiereName);
      setSelectedModule(exam.moduleName);
    } else {
      setExamData({ id: null, name: "", type: "", url: "" });
      setSelectedFiliere("");
      setSelectedModule("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setExamData({ id: null, name: "", type: "", url: "" });
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
                  EXAMS:
                    dialogType === "edit"
                      ? m.EXAMS.map((e) =>
                          e.id === examData.id ? { ...examData } : e
                        )
                      : [...m.EXAMS, { ...examData, id: Date.now() }],
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
          EXAMS: m.EXAMS.filter((e) => e.id !== examData.id),
        })),
      }))
    );
    handleCloseDialog();
  };

  return (
    <>
      {/* Add Exam Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ m: 2 }}
      >
        Add Exam
      </Button>

      {/* Exam Table */}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Filière Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.id}</TableCell>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.type}</TableCell>
                <TableCell>
                  {exam.type === "video" ? (
                    <a
                      href={exam.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={exam.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{exam.moduleName}</TableCell>
                <TableCell>{exam.filiereName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog("edit", exam)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog("delete", exam)}
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
            ? "Delete Exam"
            : dialogType === "edit"
              ? "Edit Exam"
              : "Add Exam"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "delete" ? (
            <DialogContentText>
              Are you sure you want to delete this exam?
            </DialogContentText>
          ) : (
            <>
              <TextField
                label="Exam Name"
                fullWidth
                value={examData.name}
                onChange={(e) =>
                  setExamData({ ...examData, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={examData.type}
                  onChange={(e) =>
                    setExamData({ ...examData, type: e.target.value })
                  }
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                </Select>
              </FormControl>
              {examData.type === "video" ? (
                <TextField
                  label="Video URL"
                  fullWidth
                  value={examData.url}
                  onChange={(e) =>
                    setExamData({ ...examData, url: e.target.value })
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
                      setExamData({
                        ...examData,
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

export default ExamTable;
