import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,Button
} from "@mui/material";
import { useContext } from "react";
import moduleContext from "../../Context/ModuleContext";

const CorsTable = () => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all courses
  const courses = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.courses.map((course) => ({
        ...course,
        moduleName: module.name, // Adjusted field name to match your data structure
        filiereName: f.name, // Adjusted field name to match your data structure
      }))
    )
  );

  if (!courses || courses.length === 0) {
    return <div>No courses available for this Filière.</div>;
  }

  function handleEditClick(courseId) {
    console.log(`Edit Course ID: ${courseId}`);
    // Implement edit functionality (you can add functionality here)
  }

  function handleDeleteClick(courseId) {
    console.log(`Delete Course ID: ${courseId}`);
    // Implement delete functionality (you can add functionality here)
  }

  return (
    <TableContainer
      sx={{  width: "auto" }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Module Name</TableCell>
            <TableCell>Filière Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.name}</TableCell> {/* Corrected field name */}
              <TableCell>{course.type}</TableCell> {/* Corrected field name */}
              <TableCell>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  Corse Link
                </a>
              </TableCell>
              <TableCell>{course.moduleName}</TableCell>
              <TableCell>{course.filiereName}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(course.id)}
                  variant="outlined"
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(course.id)}
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CorsTable;
