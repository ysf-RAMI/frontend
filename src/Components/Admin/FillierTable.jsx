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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * FiliereTable component
 *
 * This component displays a table of all filières, allows the user to search for
 * a specific filière, and provides buttons to add, edit, and delete filières.
 *
 * @returns {React.ReactElement} The FiliereTable component
 */
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
  const baseUrl = "http://localhost:8080/api/admin";
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  // Fetch all filières on component mount
  useEffect(() => {
    axios
      .get(`${baseUrl}/getAllFiliere`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFiliere(res.data);
        console.log("response from fillier table ", res.data);
      })
      .catch((error) => {
        console.error("Error fetching filières:", error);
        toast.error("Erreur lors de la récupération des filières");
      });
  }, [token]);



  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  // Filter filières based on search term
  const filteredFiliere = filiere.filter((f) =>
    f.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display for the current page
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
      axios
        .put(
          `${baseUrl}/ModifyFiliere`,
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
        })
        .catch((error) => {
          console.error("Error updating filière:", error);
          toast.error("Erreur lors de la modification de la filière");
        });
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedFiliereId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = () => {
    if (selectedFiliereId) {
      axios
        .delete(`${baseUrl}/RemoveFiliere/${selectedFiliereId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setFiliere((prevFiliere) =>
            prevFiliere.filter((f) => f.id !== selectedFiliereId)
          );
          toast.success("Filière supprimée avec succès");
        })
        .catch((error) => {
          console.error("Error deleting filière:", error);
          toast.error("Erreur lors de la suppression de la filière");
        });
      handleClose();
    }
  };

  const handleAddAgree = () => {
    if (addFiliereName.trim() !== "") {
      axios
        .post(
          `${baseUrl}/AddNewFiliere`,
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
        })
        .catch((error) => {
          console.error("Error adding filière:", error);
          toast.error("Erreur lors de l'ajout de la filière");
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
                        variant="contained"
                        onClick={() => handleEditClick(f.id)}
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteClick(f.id)}
                        color="error"
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
