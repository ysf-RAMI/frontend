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
} from "@mui/material";
import { useContext, useState } from "react";
import moduleContext from "../../Context/ModuleContext";

const ProfTable = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openGeneratePassword, setOpenGeneratePassword] = useState(false);
  const [selectedProfId, setSelectedProfId] = useState(null);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [profs, setProfs] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "initialPassword1",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "initialPassword2",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      password: "initialPassword3",
    },
  ]);
  if (!profs || profs.length === 0) {
    return <p>No professors available.</p>;
  }

  // Handle edit button click
  const handleEditClick = (id) => {
    const selectedProf = profs.find((p) => p.id === id);
    if (selectedProf) {
      setSelectedProfId(id);
      setNewFirstName(selectedProf.firstName);
      setNewLastName(selectedProf.lastName);
      setNewEmail(selectedProf.email);
      setOpenEdit(true);
    }
  };

  // Handle save button click in edit dialog
  const handleEditAgree = () => {
    if (selectedProfId) {
      setProfs((prevProfs) =>
        prevProfs.map((p) =>
          p.id === selectedProfId
            ? {
                ...p,
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
              }
            : p
        )
      );
      handleClose();
    }
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setSelectedProfId(id);
    setOpenDelete(true);
  };

  // Handle delete confirmation
  const handleDeleteAgree = () => {
    if (selectedProfId) {
      setProfs(profs.filter((p) => p.id !== selectedProfId));
    }
    handleClose();
  };

  // Handle change password button click
  const handleChangePasswordClick = (id) => {
    setSelectedProfId(id);
    setOpenChangePassword(true);
  };

  // Handle change password confirmation
  const handleChangePasswordAgree = () => {
    if (newPassword === confirmPassword) {
      setProfs((prevProfs) =>
        prevProfs.map((p) =>
          p.id === selectedProfId ? { ...p, password: newPassword } : p
        )
      );
      setNewPassword("");
      setConfirmPassword("");
      handleClose();
    } else {
      alert("Passwords do not match!");
    }
  };

  // Handle generate password button click
  const handleGeneratePasswordClick = (id) => {
    setSelectedProfId(id);
    const password = generatePassword();
    setGeneratedPassword(password);
    setOpenGeneratePassword(true);
  };

  // Generate a random password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Handle generate password confirmation
  const handleGeneratePasswordAgree = () => {
    setProfs((prevProfs) =>
      prevProfs.map((p) =>
        p.id === selectedProfId ? { ...p, password: generatedPassword } : p
      )
    );
    setGeneratedPassword("");
    handleClose();
  };

  // Close all dialogs
  const handleClose = () => {
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenChangePassword(false);
    setOpenGeneratePassword(false);
    setSelectedProfId(null);
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {/* Add Professor Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenEdit(true)}
        sx={{ m: 2 }}
      >
        Add Professor
      </Button>

      {/* Professor Table */}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profs.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.firstName}</TableCell>
                <TableCell>{p.lastName}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(p.id)} color="info">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(p.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleChangePasswordClick(p.id)}
                    color="warning"
                  >
                    Change Password
                  </Button>
                  <Button
                    onClick={() => handleGeneratePasswordClick(p.id)}
                    color="success"
                  >
                    Generate Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Delete Professor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this professor? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAgree}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>
          {selectedProfId ? "Edit Professor" : "Add Professor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditAgree}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openChangePassword} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePasswordAgree}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Generate Password Dialog */}
      <Dialog open={openGeneratePassword} onClose={handleClose}>
        <DialogTitle>Generate Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The generated password is: <strong>{generatedPassword}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGeneratePasswordAgree}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfTable;
