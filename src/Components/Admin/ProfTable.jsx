import React, { useState, useEffect } from "react";
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
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Key } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfTable = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selectedProfId, setSelectedProfId] = useState(null);
  const [newNom, setNewNom] = useState("");
  const [newPrenom, setNewPrenom] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [profs, setProfs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addProfPass, setAddProfPass] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const baseUrl = "https://doctorh1-kjmev.ondigitalocean.app";
  const { token } = JSON.parse(localStorage.getItem("auth")) || {};

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  useEffect(() => {
    fetchProfs();
  }, []);

  const fetchProfs = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${baseUrl}/api/admin/ListProfesseurs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfs(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des professeurs");
      toast.error("Erreur lors de la récupération des professeurs");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const filteredProfs = profs.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProfs = filteredProfs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenAdd(false);
    setOpenChangePassword(false);
    setSelectedProfId(null);
    setNewNom("");
    setNewPrenom("");
    setNewEmail("");
    setName("");
    setPrenom("");
    setEmail("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEditClick = (id) => {
    const selectedProf = profs.find((p) => p.id === id);
    if (selectedProf) {
      setSelectedProfId(id);
      setNewNom(selectedProf.nom);
      setNewPrenom(selectedProf.prenom);
      setNewEmail(selectedProf.email);
      setOpenEdit(true);
    }
  };

  const handleEditAgree = async () => {
    if (!selectedProfId || !newNom || !newPrenom || !newEmail) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/api/admin/UpdateProfesseur`,
        { id: selectedProfId, nom: newNom, prenom: newPrenom, email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfs((prevProfs) =>
        prevProfs.map((p) =>
          p.id === selectedProfId
            ? { ...p, nom: newNom, prenom: newPrenom, email: newEmail }
            : p
        )
      );
      toast.success("Professeur modifié avec succès");
      handleClose();
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProfId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/admin/DeleteProfesseur/${selectedProfId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfs((prevProfs) => prevProfs.filter((p) => p.id !== selectedProfId));
      toast.success("Professeur supprimé avec succès");
      handleClose();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleAddAgree = async () => {
    if (!name || !prenom || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/admin/AddNewProfesseur`,
        { nom: name, prenom: prenom, email: email, password: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfs((prevProfs) => [...prevProfs, response.data]);
      toast.success("Professeur ajouté avec succès");
      handleClose();
    } catch (error) {
      toast.error("Erreur lors de l'ajout du professeur");
    }
  };

  const handleChangePasswordClick = (id) => {
    setSelectedProfId(id);
    setOpenChangePassword(true);
  };

  const handleChangePasswordAgree = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/api/admin/UpdateProfPassword`,
        { id: selectedProfId, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Mot de passe mis à jour");
      setOpenChangePassword(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du mot de passe");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "newPassword") setShowPassword(!showPassword);
    else if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
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

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenAdd(true)}
              data-aos="fade-down"
              sx={{ pt: 0.5, pb: 0.5 }}
            >
              Ajouter un Professeur
            </Button>

            <TextField
              label="Rechercher un Professeur"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "300px" }}
              data-aos="fade-down"
            />
          </Box>

          {profs.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ p: 2 }}>
              Aucun professeur disponible.
            </Typography>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: "calc(100vh - 200px)" }} // Adjust height to fit screen
                data-aos="fade-up"
              >
                <Table>
                  <TableHead style={{ backgroundColor: "#f4f4f9" }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Prénom</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProfs.map((p, index) => (
                      <TableRow
                        key={p.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f4f4f9",
                        }}
                        data-aos="fade-up"
                      >
                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell>{p.nom}</TableCell>
                        <TableCell>{p.prenom}</TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => handleEditClick(p.id)}
                            color="info"
                            variant="outlined"
                            sx={{ ml: 0.5 }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(p.id)}
                            color="secondary"
                            variant="outlined"
                            sx={{ ml: 0.5 }}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => handleChangePasswordClick(p.id)}
                            color="warning"
                            variant="outlined"
                            sx={{ ml: 0.5 }}
                            startIcon={<Key />}
                          >
                            Password
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
                count={filteredProfs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </>
      )}

      {/* Dialogs for Delete, Edit, Add, and Change Password */}
      <Dialog open={openDelete} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle sx={{
          background: "linear-gradient(to right,rgb(171, 0, 0), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }} >Supprimer Professeur</DialogTitle>
        <DialogContent>
          <DialogContentText color="error">
            Êtes-vous sûr de vouloir supprimer ce professeur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" variant="outlined">
            Annuler
          </Button>
          <Button onClick={handleDeleteAgree} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle
          sx={{
            background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
            color: "white",
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Modifier Professeur
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Nom"
            fullWidth
            value={newNom}
            onChange={(e) => setNewNom(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Prénom"
            fullWidth
            value={newPrenom}
            onChange={(e) => setNewPrenom(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" variant="outlined">
            Annuler
          </Button>
          <Button onClick={handleEditAgree} color="success" variant="outlined">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle
          sx={{
            background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
            color: "white",
            fontWeight: "bold",
            mb: 1,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Ajouter un Professeur
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Nom"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Prénom"
            fullWidth
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="Mot de passe"
            fullWidth
            type={addProfPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setAddProfPass(!addProfPass)}
                    edge="end"
                  >
                    {addProfPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" variant="outlined">
            Annuler
          </Button>
          <Button onClick={handleAddAgree} color="success" variant="outlined">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openChangePassword}
        onClose={handleClose}
        data-aos="zoom-in"
      >
        <DialogTitle sx={{
          background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
          color: "white",
          fontWeight: "bold",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}>Changer le mot de passe</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("newPassword")}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword !== newPassword && confirmPassword !== ""}
            helperText={
              confirmPassword !== newPassword && confirmPassword !== ""
                ? "Les mots de passe ne correspondent pas"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} 
            color="info"
            variant="outlined"
            sx={{ ml: 0.5 }}
          >Annuler</Button>
          <Button
            onClick={handleChangePasswordAgree}
            color="success"
            disabled={!newPassword || newPassword !== confirmPassword}
            variant="outlined"
            sx={{ ml: 0.5 }}
            
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfTable;
