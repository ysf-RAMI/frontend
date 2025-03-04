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
} from "@mui/material";
import { Visibility, VisibilityOff, Key } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfTable = () => {
  // State variables
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [profs, setProfs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addProfPass, setAddProfPass] = useState(false);

  const baseUrl = "http://localhost:8080/api/admin";
  const { token } = JSON.parse(localStorage.getItem("auth")) || {};

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  // Fetch professors on component mount
  useEffect(() => {
    fetchProfs();
  }, []);

  const fetchProfs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/ListProfesseurs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfs(response.data);
    } catch (error) {
      console.error("Error fetching professors:", error);
      toast.error("Erreur lors de la récupération des professeurs");
    }
  };

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredProfs = profs.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedProfs = filteredProfs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleAddProfPass() {
    setAddProfPass(!addProfPass);
  }

  // Close all dialogs
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

  // Edit professor
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
        `${baseUrl}/UpdateProfesseur`,
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
      console.error("Error updating professor:", error);
      toast.error("Erreur lors de la modification");
    }
  };

  // Delete professor
  const handleDeleteClick = (id) => {
    setSelectedProfId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = async () => {
    try {
      await axios.delete(`${baseUrl}/DeleteProfesseur/${selectedProfId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfs((prevProfs) => prevProfs.filter((p) => p.id !== selectedProfId));
      toast.success("Professeur supprimé avec succès");
      handleClose();
    } catch (error) {
      console.error("Error deleting professor:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  // Add professor
  const handleAddAgree = async () => {
    if (!name || !prenom || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/AddNewProfesseur`,
        { nom: name, prenom: prenom, email: email, password: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfs((prevProfs) => [...prevProfs, response.data]);
      toast.success("Professeur ajouté avec succès");
      handleClose();
    } catch (error) {
      console.error("Error adding professor:", error);
      toast.error("Erreur lors de l'ajout du professeur");
    }
  };

  // Change password
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
        `${baseUrl}/UpdateProfPassword`,
        { id: selectedProfId, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Mot de passe mis à jour");
      setOpenChangePassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Erreur lors de la mise à jour du mot de passe");
    }
  };

  // Password strength and visibility
  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Très faible";
    if (password.length < 8) return "Faible";
    if (password.length < 10) return "Fort";
    return "Très fort";
  };

  const getPasswordStrengthColor = (password) => {
    if (password.length === 0) return "primary";
    if (password.length < 6) return "error";
    if (password.length < 8) return "warning";
    if (password.length < 10) return "info";
    return "success";
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
      {/* Add Professor Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
        sx={{ m: 2 }}
        data-aos="fade-down"
      >
        Ajouter un Professeur
      </Button>

      {/* Search Bar */}
      <TextField
        label="Rechercher un Professeur"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
        data-aos="fade-down"
      />

      {/* Professors Table */}
      <TableContainer component={Paper} sx={{ m: 2 }} data-aos="fade-up">
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
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f4f4f9",
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
                    sx={{ m: 0.5 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(p.id)}
                    color="secondary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleChangePasswordClick(p.id)}
                    color="warning"
                    variant="outlined"
                    sx={{ m: 0.5 }}
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

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProfs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-aos="fade-up"
      />

      {/* Dialogs for Delete, Edit, Add, and Change Password */}
      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle>Supprimer Professeur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce professeur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDeleteAgree} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle>Modifier Professeur</DialogTitle>
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
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleEditAgree} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={handleClose} data-aos="zoom-in">
        <DialogTitle>Ajouter un Professeur</DialogTitle>
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
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAddAgree} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={openChangePassword}
        onClose={handleClose}
        data-aos="zoom-in"
      >
        <DialogTitle>Changer le mot de passe</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            color={getPasswordStrengthColor(newPassword)}
            helperText={getPasswordStrength(newPassword)}
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
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={handleChangePasswordAgree}
            color="primary"
            disabled={!newPassword || newPassword !== confirmPassword}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfTable;
