import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ResourceManager = ({ resourceType }) => {
  const [resources, setResources] = useState([]);
  const [modules, setModules] = useState([]); // All modules for the professor
  const [filiers, setFiliers] = useState([]); // All filières from the database
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [nom, setNom] = useState("");
  const [dataType, setDataType] = useState("VIDEO");
  const [data, setData] = useState(null);
  const [lien, setLien] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedFiliereName, setSelectedFiliereName] = useState("");

  const baseUrl = "http://localhost:8080/api/professeur";
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const profId = localStorage.getItem("profId");

  // Fetch resources, modules, and filières on component mount
  useEffect(() => {
    fetchResources();
    fetchModules();
    fetchFiliers();
  }, [resourceType]);

  // Fetch resources by type
  const fetchResources = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getResourcesByType/${resourceType}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to fetch resources");
    }
  };

  // Fetch all modules for the professor
  const fetchModules = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getAllModuleByProfId/${profId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules");
    }
  };

  // Fetch all filières from the database
  const fetchFiliers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllFiliere`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiliers(response.data);
    } catch (error) {
      console.error("Error fetching filières:", error);
      toast.error("Failed to fetch filières");
    }
  };

  // Handle adding a new resource
  const handleAddResource = async () => {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("type", resourceType);
    formData.append("dataType", dataType);
    formData.append("data", data);
    formData.append("lien", lien);
    formData.append("moduleId", selectedModuleId);
    formData.append("filiereName", selectedFiliereName);

    try {
      const response = await axios.post(`${baseUrl}/addResource`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resource added successfully");
      fetchResources();
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error(`Error adding resource: ${error.message}`);
    }
  };

  // Handle updating an existing resource
  const handleUpdateResource = async () => {
    const formData = new FormData();
    formData.append("id", selectedResource.id);
    formData.append("nom", nom);
    formData.append("type", resourceType);
    formData.append("dataType", dataType);
    formData.append("data", data);
    formData.append("lien", lien);
    formData.append("moduleId", selectedModuleId);
    formData.append("filiereName", selectedFiliereName);

    try {
      const response = await axios.put(`${baseUrl}/updateResource`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resource updated successfully");
      fetchResources();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating resource:", error);
      toast.error(`Error updating resource: ${error.message}`);
    }
  };

  // Handle editing a resource
  const handleEditClick = (resource) => {
    setSelectedResource(resource);
    setNom(resource.nom);
    setDataType(resource.dataType);
    setLien(resource.lien);
    setSelectedModuleId(resource.moduleId);
    setSelectedFiliereName(resource.filiereName);
    setOpenDialog(true);
  };

  // Close the dialog and reset form fields
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedResource(null);
    setNom("");
    setDataType("VIDEO");
    setData(null);
    setLien("");
    setSelectedModuleId("");
    setSelectedFiliereName("");
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add Resource
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell>{resource.nom}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.dataType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(resource)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedResource ? "Edit Resource" : "Add Resource"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Data Type</InputLabel>
            <Select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              label="Data Type"
            >
              <MenuItem value="VIDEO">Video</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
            </Select>
          </FormControl>
          {dataType === "PDF" && (
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setData(e.target.files[0])}
            />
          )}
          {dataType === "VIDEO" && (
            <TextField
              label="Video Link"
              fullWidth
              value={lien}
              onChange={(e) => setLien(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Module</InputLabel>
            <Select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              label="Module"
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            options={filiers}
            getOptionLabel={(filiere) => filiere.nom}
            value={filiers.find((f) => f.nom === selectedFiliereName) || null}
            onChange={(e, newValue) =>
              setSelectedFiliereName(newValue?.nom || "")
            }
            renderInput={(params) => (
              <TextField {...params} label="Filière" fullWidth sx={{ mb: 2 }} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={
              selectedResource ? handleUpdateResource : handleAddResource
            }
          >
            {selectedResource ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResourceManager;
