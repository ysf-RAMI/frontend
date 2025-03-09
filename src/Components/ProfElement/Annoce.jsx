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
import logoSite from "../../assets/annonceDefaultImage.jpg";

const baseUrl = "http://localhost:8080";
const token = JSON.parse(localStorage.getItem("auth")).token;
const profId = localStorage.getItem("profId");

export default function Annonce() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 1, once: true });
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/professeur/getAllAnnonceByIdProfesseru/${profId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnnouncements(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleOpenEditDialog = (announcement) => {
    setCurrentAnnouncement(announcement);
    setOpenEditDialog(true);
  };
  const handleOpenDeleteDialog = (announcement) => {
    setCurrentAnnouncement(announcement);
    setOpenDeleteDialog(true);
  };

  const handleCloseAddDialog = () => setOpenAddDialog(false);
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentAnnouncement(null);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentAnnouncement(null);
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("idProfesseur", profId);

    axios
      .post(`${baseUrl}/api/professeur/addAnnonce`, formData, {
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
        toast.error("Failed to add announcement.");
      });
  };

  const handleEditAnnouncement = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", currentAnnouncement.id);
    formData.append("idProfesseur", profId);

    axios
      .put(`${baseUrl}/api/professeur/updateAnnonce`, formData, {
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
        toast.error("Failed to update announcement.");
      });
  };

  const handleDeleteAnnouncement = () => {
    axios
      .delete(
        `${baseUrl}/api/professeur/deleteAnnonce/${currentAnnouncement.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
        toast.error("Failed to delete announcement.");
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
        newestOnTop={true}
        closeButton={false}
        enableMultiContainer={true}
        position="top-center"
        zIndex={9999}
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
                  image={
                    announcement.imageUrl
                      ? `${baseUrl}${announcement.imageUrl}`
                      : logoSite
                  }
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
          <DialogTitle
            sx={{
              background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
              color: "white",
              fontWeight: "bold",
              mb: 1,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Add Announcement
          </DialogTitle>
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
          <DialogTitle
            sx={{
              background: "linear-gradient(to right,rgb(0, 80, 171), #01162e)",
              color: "white",
              fontWeight: "bold",
              mb: 1,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Edit Announcement
          </DialogTitle>
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
          <DialogTitle
            sx={{
              background: "linear-gradient(to right,rgb(171, 0, 0), #01162e)",
              color: "white",
              fontWeight: "bold",
              mb: 3,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Delete Announcement
          </DialogTitle>
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
