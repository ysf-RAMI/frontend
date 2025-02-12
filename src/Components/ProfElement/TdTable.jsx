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

const TDTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add", "edit", "delete"
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [tdData, setTdData] = useState({
    id: null,
    name: "",
    type: "",
    url: "",
  });

  const tds = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TD.map((td) => ({
        ...td,
        moduleName: module.name,
        filiereName: f.name,
      }))
    )
  );

  const handleOpenDialog = (type, td = null) => {
    setDialogType(type);
    if (td) {
      setTdData({
        id: td.id,
        name: td.name,
        type: td.type,
        url: td.url,
      });
      setSelectedFiliere(td.filiereName);
      setSelectedModule(td.moduleName);
    } else {
      setTdData({ id: null, name: "", type: "", url: "" });
      setSelectedFiliere("");
      setSelectedModule("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTdData({ id: null, name: "", type: "", url: "" });
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
                  TD:
                    dialogType === "edit"
                      ? m.TD.map((t) =>
                          t.id === tdData.id ? { ...tdData } : t
                        )
                      : [...m.TD, { ...tdData, id: Date.now() }],
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
          TD: m.TD.filter((t) => t.id !== tdData.id),
        })),
      }))
    );
    handleCloseDialog();
  };

  return (
    <>
      {/* Add TD Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ m: 2 }}
      >
        Add TD
      </Button>

      {/* TD Table */}
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
            {tds.map((td) => (
              <TableRow key={td.id}>
                <TableCell>{td.id}</TableCell>
                <TableCell>{td.name}</TableCell>
                <TableCell>{td.type}</TableCell>
                <TableCell>
                  {td.type === "video" ? (
                    <a href={td.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={td.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{td.moduleName}</TableCell>
                <TableCell>{td.filiereName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog("edit", td)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog("delete", td)}
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
            ? "Delete TD"
            : dialogType === "edit"
              ? "Edit TD"
              : "Add TD"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "delete" ? (
            <DialogContentText>
              Are you sure you want to delete this TD?
            </DialogContentText>
          ) : (
            <>
              <TextField
                label="TD Name"
                fullWidth
                value={tdData.name}
                onChange={(e) => setTdData({ ...tdData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={tdData.type}
                  onChange={(e) =>
                    setTdData({ ...tdData, type: e.target.value })
                  }
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                </Select>
              </FormControl>
              {tdData.type === "video" ? (
                <TextField
                  label="Video URL"
                  fullWidth
                  value={tdData.url}
                  onChange={(e) =>
                    setTdData({ ...tdData, url: e.target.value })
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
                      setTdData({
                        ...tdData,
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

export default TDTable;
