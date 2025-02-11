import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import moduleContext from "../../Context/ModuleContext";
import { Button, Modal } from "react-bootstrap";

const CorsTable = ({ open }) => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all courses
  const courses = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.courses.map((course) => ({
        ...course,
        moduleName: module.moduleName,
        filiereName: f.nomFiliere,
      }))
    )
  );

  if (!courses || courses.length === 0) {
    return <div>No courses available for this Filière.</div>;
  }

  function handleEditClick() {
    // Handle edit functionality (you can add functionality here)
  }

  function handleDeleteClick() {
    // Handle delete functionality (you can add functionality here)
  }

  return (
    open && (
      <TableContainer
        sx={{ marginTop: "100px", width: "auto" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Course Link</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Filière Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.courseType}</TableCell>
                <TableCell>
                  <a
                    href={course.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "black" }}
                  >
                    Link
                  </a>
                </TableCell>

                <TableCell>{course.moduleName}</TableCell>
                <TableCell>{course.filiereName}</TableCell>
                <TableCell>
                  <Button onClick={handleEditClick}>Edit</Button>
                  <Button onClick={handleDeleteClick}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default CorsTable;
