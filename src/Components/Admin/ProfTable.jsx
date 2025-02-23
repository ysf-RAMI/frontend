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
import axios from "axios";
import { useState, useEffect } from "react";
import { Key } from "@mui/icons-material";
import { toast } from "react-toastify";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [profs, setProfs] = useState([]);

  const baseUrl = "http://localhost:8080/api/admin";
  const { token } = JSON.parse(localStorage.getItem("auth")) || {};

  useEffect(() => {
    axios
      .get(`${baseUrl}/ListProfesseurs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response: proftable" + response.data);
        setProfs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProfs = filteredProfs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const handleEditAgree = async () => {
    if (!selectedProfId || !newNom || !newPrenom || !newEmail) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/UpdateProfesseur`,
        {
          id: selectedProfId,
          nom: newNom,
          prenom: newPrenom,
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const handleDeleteClick = (id) => {
    setSelectedProfId(id);
    setOpenDelete(true);
  };

  const handleDeleteAgree = async () => {
    try {
      await axios.delete(`${baseUrl}/DeleteProfesseur/${selectedProfId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfs((prevProfs) => prevProfs.filter((p) => p.id !== selectedProfId));
      toast.success("Professeur supprimé avec succès");
      handleClose();
    } catch (error) {
      console.error("Error deleting professor:", error);
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
        `${baseUrl}/AddNewProfesseur`,
        {
          nom: name,
          prenom: prenom,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfs((prevProfs) => [...prevProfs, response.data]);
      toast.success("Professeur ajouté avec succès");
      handleClose();
    } catch (err) {
      console.error("Error adding professor:", err);
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
        `${baseUrl}/ChangePassword`,
        {
          id: selectedProfId,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Mot de passe modifié avec succès");
      handleClose();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Erreur lors de la modification du mot de passe");
    }
  };

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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
        sx={{ m: 2 }}
      >
        Ajouter un Professeur
      </Button>

      <TextField
        label="Rechercher un Professeur"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: "300px" }}
      />

      <TableContainer component={Paper} sx={{ m: 2 }}>
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
              >
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{p.nom}</TableCell>
                <TableCell>{p.prenom}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleEditClick(p.id)}
                    color="info"
                    variant="contained"
                    sx={{ m: 0.5 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(p.id)}
                    color="error"
                    variant="contained"
                    sx={{ m: 0.5 }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    onClick={() => handleChangePasswordClick(p.id)}
                    color="warning"
                    variant="contained"
                    sx={{ m: 0.5 }}
                    startIcon={<Key />}
                  >
                    Mot de passe
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

      <Dialog open={openDelete} onClose={handleClose}>
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

      <Dialog open={openEdit} onClose={handleClose}>
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

      <Dialog open={openAdd} onClose={handleClose}>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleAddAgree} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openChangePassword} onClose={handleClose}>
        <DialogTitle>Changer le mot de passe</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            color={getPasswordStrengthColor(newPassword)}
            helperText={getPasswordStrength(newPassword)}
          />
          <TextField
            margin="dense"
            label="Confirmer le mot de passe"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword !== newPassword && confirmPassword !== ""}
            helperText={
              confirmPassword !== newPassword && confirmPassword !== ""
                ? "Les mots de passe ne correspondent pas"
                : ""
            }
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
