import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Pagination,
  styled,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { CloudUploadOutlined } from "@mui/icons-material";

const baseUrl = "http://localhost:8080/api/professeur";
const token = JSON.parse(localStorage.getItem("auth"))?.token;
const profId = localStorage.getItem("profId");

export default function Annonce() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [page, setPage] = useState(1); // Pagination state
  const itemsPerPage = 6; // Number of announcements per page

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1, once: true });
  }, []);

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios
      .get(`${baseUrl}/getAllAnnonceByIdProfesseru/${profId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        toast.error("Failed to fetch announcements.");
      });
  };

  // Handlers for opening dialogs
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleOpenEditDialog = (announcement) => {
    setCurrentAnnouncement(announcement);
    setOpenEditDialog(true);
  };
  const handleOpenDeleteDialog = (announcement) => {
    setCurrentAnnouncement(announcement);
    setOpenDeleteDialog(true);
  };

  // Handlers for closing dialogs
  const handleCloseAddDialog = () => setOpenAddDialog(false);
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentAnnouncement(null);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentAnnouncement(null);
  };

  // Add announcement
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("idProfesseur", profId);

    axios
      .post(`${baseUrl}/addAnnonce`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAnnouncements([...announcements, response.data]);
        handleCloseAddDialog();
        toast.success("Announcement added successfully!");
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);
        toast.error("Failed to add announcement.");
      });
  };

  // Edit announcement
  const handleEditAnnouncement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", currentAnnouncement.id);
    formData.append("idProfesseur", profId);

    axios
      .put(`${baseUrl}/updateAnnonce`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAnnouncements((prev) =>
          prev.map((announcement) =>
            announcement.id === currentAnnouncement.id
              ? response.data
              : announcement
          )
        );
        handleCloseEditDialog();
        toast.success("Announcement updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating announcement:", error);
        toast.error("Failed to update announcement.");
      });
  };

  // Delete announcement
  const handleDeleteAnnouncement = () => {
    axios
      .delete(`${baseUrl}/deleteAnnonce/${currentAnnouncement.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        handleCloseDeleteDialog();
        setAnnouncements((prev) =>
          prev.filter(
            (announcement) => announcement.id !== currentAnnouncement.id
          )
        );
        toast.success("Announcement deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
        toast.error("Failed to delete announcement.");
      });
  };

  // Pagination logic
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate the announcements to display for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnnouncements = announcements.slice(startIndex, endIndex);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container maxWidth="xl">
        <Row className="mb-5">
          <Col>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                }}
              >
                Les announcements
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{ bgcolor: "primary.main", color: "white" }}
              >
                Add Announcement
              </Button>
            </Box>
          </Col>
        </Row>

        <Grid container spacing={4}>
          {displayedAnnouncements.map((announcement) => (
            <Grid item xs={12} sm={6} md={4} key={announcement.id}>
              <Card
                onMouseEnter={() => setHoveredCard(announcement.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  },
                }}
                data-aos="fade-up"
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={`http://localhost:8080${announcement.imageUrl}`}
                  alt={announcement.titre}
                  sx={{
                    transition: "transform 0.3s ease",
                    ...(hoveredCard === announcement.id && {
                      transform: "scale(1.05)",
                    }),
                  }}
                />
                <CardContent
                  sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: "auto" }}
                    >
                      <AccessTimeIcon
                        sx={{
                          fontSize: "0.875rem",
                          mr: 0.5,
                          color: "text.secondary",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {announcement.date}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, fontSize: "1.25rem", mb: 2 }}
                  >
                    {announcement.titre}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "10px", color: "grey" }}
                  >
                    description
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {announcement.description}
                  </Typography>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenEditDialog(announcement)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDeleteDialog(announcement)}
                      startIcon={<DeleteIcon />}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(announcements.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        {/* Add Announcement Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth>
          <DialogTitle>Add Announcement</DialogTitle>
          <DialogContent>
            <form id="add-announcement-form" onSubmit={handleAddAnnouncement}>
              <TextField
                name="titre"
                label="Title"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                color="primary"
              />
              <TextField
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                variant="outlined"
                color="primary"
              />
              <Button
                component="label"
                variant="outlined"
                color="primary"
                startIcon={<CloudUploadOutlined />}
                sx={{ mt: 2 }}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseAddDialog}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              form="add-announcement-form"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Announcement Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth>
          <DialogTitle>Edit Announcement</DialogTitle>
          <DialogContent>
            <form id="edit-announcement-form" onSubmit={handleEditAnnouncement}>
              <TextField
                name="titre"
                label="Title"
                defaultValue={currentAnnouncement?.titre || ""}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                color="primary"
              />
              <TextField
                name="description"
                label="Description"
                defaultValue={currentAnnouncement?.description || ""}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                variant="outlined"
                color="primary"
              />
              <Button
                component="label"
                variant="outlined"
                color="primary"
                startIcon={<CloudUploadOutlined />}
                sx={{ mt: 2 }}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseEditDialog}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              form="edit-announcement-form"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Announcement Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogContent style={{ color: "red" }}>
            Are you sure you want to delete the announcement "
            {currentAnnouncement?.titre}"?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAnnouncement}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
