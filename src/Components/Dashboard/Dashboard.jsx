import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  School,
  People,
  Assignment,
  PersonAdd,
  BarChart as BarChartIcon,
  Add as AddIcon,
  Notifications,
  Assessment,
  LibraryBooks,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    professors: 45,
    filieres: 12,
    modules: 86,
    students: 1250,
    resources: {
      courses: 120,
      td: 85,
      tp: 65,
      exams: 95,
    },
  });

  const [openDialog, setOpenDialog] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog("");
  };

  const handleAddCourse = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats((prev) => ({
        ...prev,
        resources: {
          ...prev.resources,
          courses: prev.resources.courses + 1,
        },
      }));
      handleCloseDialog();
      setShowNotification(true);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <Card
      sx={{
        height: "100%",
        borderLeft: `4px solid ${color}`,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
      data-aos="fade-up"
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            <Icon />
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {value.toLocaleString()}
          </Typography>
          {trend !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: trend > 0 ? "success.main" : "error.main",
              }}
            >
              {trend > 0 ? <TrendingUp /> : <TrendingDown />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: color, "&:hover": { bgcolor: color } }}
        >
          Manage
        </Button>
      </CardContent>
    </Card>
  );

  const resourcesData = {
    labels: ["Courses", "TD", "TP", "Exams"],
    datasets: [
      {
        label: "Resources",
        data: [
          stats.resources.courses,
          stats.resources.td,
          stats.resources.tp,
          stats.resources.exams,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#F44336"],
      },
    ],
  };

  const timeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Student Progress",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#2196F3",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Action completed successfully!
        </Alert>
      </Snackbar>

      {/* Header */}
      <Box sx={{ mb: 4 }} data-aos="fade-down">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Education Dashboard
          </Typography>
          <IconButton color="primary" sx={{ bgcolor: "action.hover" }}>
            <Notifications />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your educational platform with ease
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={School}
            title="Professors"
            value={stats.professors}
            color="#4CAF50"
            trend={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={People}
            title="Students"
            value={stats.students}
            color="#2196F3"
            trend={-2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={LibraryBooks}
            title="Modules"
            value={stats.modules}
            color="#FF9800"
            trend={8}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Assessment}
            title="Filières"
            value={stats.filieres}
            color="#F44336"
            trend={3}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8} data-aos="fade-up">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resources Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={resourcesData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} data-aos="fade-up">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={timeData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom data-aos="fade-up">
        Quick Actions
      </Typography>
      <Grid container spacing={3} data-aos="fade-up">
        {[
          { title: "Add Course", icon: Assignment, color: "#4CAF50" },
          { title: "Add Student", icon: PersonAdd, color: "#2196F3" },
          { title: "View Analytics", icon: BarChartIcon, color: "#FF9800" },
          { title: "Add Module", icon: AddIcon, color: "#F44336" },
        ].map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => setOpenDialog(action.title)}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: action.color,
                    margin: "0 auto",
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <action.icon />
                </Avatar>
                <Typography variant="h6">{action.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Course Dialog */}
      <Dialog open={openDialog === "Add Course"} onClose={handleCloseDialog}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField fullWidth label="Course Title" margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Module</InputLabel>
              <Select label="Module">
                <MenuItem value="math">Mathematics</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
                <MenuItem value="chemistry">Chemistry</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddCourse}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={openDialog === "Add Student"} onClose={handleCloseDialog}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField fullWidth label="Student Name" margin="normal" />
            <TextField fullWidth label="Email" type="email" margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Filière</InputLabel>
              <Select label="Filière">
                <MenuItem value="cs">Computer Science</MenuItem>
                <MenuItem value="math">Mathematics</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained">Add Student</Button>  
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
