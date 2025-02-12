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

const TpTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add", "edit", "delete"
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [tpData, setTpData] = useState({
    id: null,
    name: "",
    type: "",
    url: "",
  });

  const tps = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TP.map((tp) => ({
        ...tp,
        moduleName: module.name,
        filiereName: f.name,
      }))
    )
  );

  const handleOpenDialog = (type, tp = null) => {
    setDialogType(type);
    if (tp) {
      setTpData({
        id: tp.id,
        name: tp.name,
        type: tp.type,
        url: tp.url,
      });
      setSelectedFiliere(tp.filiereName);
      setSelectedModule(tp.moduleName);
    } else {
      setTpData({ id: null, name: "", type: "", url: "" });
      setSelectedFiliere("");
      setSelectedModule("");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTpData({ id: null, name: "", type: "", url: "" });
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
                  TP:
                    dialogType === "edit"
                      ? m.TP.map((t) =>
                          t.id === tpData.id ? { ...tpData } : t
                        )
                      : [...m.TP, { ...tpData, id: Date.now() }],
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
          TP: m.TP.filter((t) => t.id !== tpData.id),
        })),
      }))
    );
    handleCloseDialog();
  };

  return (
    <>
      {/* Add TP Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ m: 2 }}
      >
        Add TP
      </Button>

      {/* TP Table */}
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
            {tps.map((tp) => (
              <TableRow key={tp.id}>
                <TableCell>{tp.id}</TableCell>
                <TableCell>{tp.name}</TableCell>
                <TableCell>{tp.type}</TableCell>
                <TableCell>
                  {tp.type === "video" ? (
                    <a href={tp.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    <Button
                      variant="outlined"
                      component="a"
                      href={tp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
                <TableCell>{tp.moduleName}</TableCell>
                <TableCell>{tp.filiereName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog("edit", tp)}
                    color="info"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog("delete", tp)}
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
            ? "Delete TP"
            : dialogType === "edit"
              ? "Edit TP"
              : "Add TP"}
        </DialogTitle>
        <DialogContent>
          {dialogType === "delete" ? (
            <DialogContentText>
              Are you sure you want to delete this TP?
            </DialogContentText>
          ) : (
            <>
              <TextField
                label="TP Name"
                fullWidth
                value={tpData.name}
                onChange={(e) => setTpData({ ...tpData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={tpData.type}
                  onChange={(e) =>
                    setTpData({ ...tpData, type: e.target.value })
                  }
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                </Select>
              </FormControl>
              {tpData.type === "video" ? (
                <TextField
                  label="Video URL"
                  fullWidth
                  value={tpData.url}
                  onChange={(e) =>
                    setTpData({ ...tpData, url: e.target.value })
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
                      setTpData({
                        ...tpData,
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

export default TpTable;
