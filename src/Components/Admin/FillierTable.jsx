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
  TablePagination,
  CircularProgress, // Import CircularProgress for loading spinner
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const FiliereTable = () => {
  const [filiere, setFiliere] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedFiliereId, setSelectedFiliereId] = useState(null);
  const [newFiliereName, setNewFiliereName] = useState("");
  const [addFiliereName, setAddFiliereName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false); // Loading state
  const baseUrl = "http://localhost:8080";
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  // Fetch all filières on component mount
  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get(`${baseUrl}/api/admin/getAllFiliere`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFiliere(res.data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch(() => {
        toast.error("Erreur lors de la récupération des filières");
        setLoading(false); // Stop loading on error
      });
  }, [token]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredFiliere = filiere.filter((f) =>
    f.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedFiliere = filteredFiliere.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleEditClick = (id) => {
    const selectedFiliere = filiere.find((f) => f.id === id);
    if (selectedFiliere) {
      setSelectedFiliereId(id);
      setNewFiliereName(selectedFiliere.nom);
      setOpenEdit(true);
    }
  };

  const handleEditAgree = () => {
    if (selectedFiliereId && newFiliereName.trim() !== "") {
      setLoading(true); // Start loading
      axios
        .put(
          `${baseUrl}/api/admin/ModifyFiliere`,
          { id: selectedFiliereId, nom: newFiliereName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setFiliere((prevFiliere) =>
            prevFiliere.map((f) =>
              f.id === selectedFiliereId ? { ...f, nom: newFiliereName } : f
            )
          );
          toast.success("Filière modifiée avec succès");
          handleClose();
          setLoading(false); // Stop loading after success
        })
        .catch(() => {
          toast.error("Erreur lors de la modification de la filière");
          setLoading(false); // Stop loading on error
        });
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedFiliereId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = () => {
    if (selectedFiliereId) {
      setLoading(true); // Start loading
      axios
        .delete(`${baseUrl}/api/admin/RemoveFiliere/${selectedFiliereId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setFiliere((prevFiliere) =>
            prevFiliere.filter((f) => f.id !== selectedFiliereId)
          );
          toast.success("Filière supprimée avec succès");
          setLoading(false); // Stop loading after success
        })
        .catch(() => {
          toast.error("Erreur lors de la suppression de la filière");
          setLoading(false); // Stop loading on error
        });
      handleClose();
    }
  };

  const handleAddAgree = () => {
    if (addFiliereName.trim() !== "") {
      setLoading(true); // Start loading
      axios
        .post(
          `${baseUrl}/api/admin/AddNewFiliere`,
          { nom: addFiliereName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFiliere((prevFiliere) => [...prevFiliere, res.data]);
          toast.success("Filière ajoutée avec succès");
          setAddFiliereName("");
          handleClose();
          setLoading(false); // Stop loading after success
        })
        .catch(() => {
          toast.error("Erreur lors de l'ajout de la filière");
          setLoading(false); // Stop loading on error
        });
    }
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setSelectedFiliereId(null);
    setNewFiliereName("");
    setAddFiliereName("");
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

      {/* Loading Spinner */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        sx={{ m: 2 }}
      >
        Add Filière
      </Button>

      {/* Search Box */}
      <TextField
        label="Search Filière"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
      />

      {filiere && filiere.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ m: 2 }}>
            <Table>
              <TableHead style={{ backgroundColor: "#f4f4f9" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom Filière</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedFiliere.map((f, index) => (
                  <TableRow
                    key={f.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f9",
                    }}
                  >
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{f.nom}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(f.id)}
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteClick(f.id)}
                        color="secondary"
                        sx={{ ml: 2 }}
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
            count={filteredFiliere.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <p>No filière available.</p>
      )}

      {/* Dialogs for Add, Edit, and Delete */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete Filière</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this filière? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAgree}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Filière</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new name for the filière:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Filière Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFiliereName}
            onChange={(e) => setNewFiliereName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditAgree}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleClose}>
        <DialogTitle>Add Filière</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Filière Name"
            type="text"
            fullWidth
            variant="standard"
            value={addFiliereName}
            onChange={(e) => setAddFiliereName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAgree}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FiliereTable;
