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
import { Button } from "react-bootstrap";

const ExamTable = ({ open }) => {
  const { filiere, setFiliere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all Exams
  const exams = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.EXAMS.map((exam) => ({
        ...exam,
        moduleName: module.moduleName,
        filiereName: f.nomFiliere,
      }))
    )
  );

  if (!open || !exams || exams.length === 0) {
    return null; // Return nothing if the table is not open or there are no exams
  }

  function handleEditClick() {
    // Handle edit functionality (you can add functionality here)
  }

  function handleDeleteClick() {
    // Handle delete functionality (you can add functionality here)
  }

  return (
    <TableContainer
      sx={{ marginTop: "100px", width: "auto" }}
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
          {exams.map((exam, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{exam.examName}</TableCell>
              <TableCell>{exam.examType}</TableCell>
              <TableCell>
                <a
                  href={exam.examUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  Exam Link
                </a>
              </TableCell>

              <TableCell>{exam.moduleName}</TableCell>
              <TableCell>{exam.filiereName}</TableCell>
              <TableCell>
                <Button onClick={handleEditClick}>Edit</Button>
                <Button onClick={handleDeleteClick}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExamTable;
