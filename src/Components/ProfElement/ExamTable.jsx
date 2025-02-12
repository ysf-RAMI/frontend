import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useContext } from "react";
import moduleContext from "../../Context/ModuleContext";

const ExamTable = () => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all Exams
  const exams = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.EXAMS.map((exam) => ({
        ...exam,
        moduleName: module.name, // Adjusted field name to match your data structure
        filiereName: f.name, // Adjusted field name to match your data structure
      }))
    )
  );

  if (!exams || exams.length === 0) {
    return null; // Return nothing if the table is not open or there are no exams
  }

  function handleEditClick(examID) {
    console.log(`Edit Exam ID: ${examID}`);
  }

  function handleDeleteClick(examID) {
    console.log(`Delete Exam ID: ${examID}`);
  }

  return (
    <TableContainer
      sx={{ width: "auto" }}
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
              <TableCell>{exam.name}</TableCell>
              <TableCell>{exam.type}</TableCell>
              <TableCell>
                <a
                  href={exam.url}
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
                <Button
                  onClick={() => handleEditClick(exam.id)}
                  variant="outlined"
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(exam.id)}
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

export default ExamTable;
