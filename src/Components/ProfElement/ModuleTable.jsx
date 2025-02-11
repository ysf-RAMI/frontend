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

const ModuleTable = ({ open }) => {
  const { filiere, setFiliere } = useContext(moduleContext);

  // Iterate over all filières to get all modules
  const modules = filiere.flatMap((f) =>
    f.modules.map((module) => ({
      ...module,
      filiereName: f.nomFiliere,
    }))
  );

  if (!open || !modules || modules.length === 0) {
    return null; // Return nothing if the table is not open or there are no modules
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
            <TableCell>Link</TableCell>
            <TableCell>Filière Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{module.moduleName}</TableCell>
              <TableCell>
                <a
                  href={module.moduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  Module Link
                </a>
              </TableCell>
              <TableCell>{module.filiereName}</TableCell>
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

export default ModuleTable;
