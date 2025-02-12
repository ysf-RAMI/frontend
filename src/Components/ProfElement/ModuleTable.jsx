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

const ModuleTable = () => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières to get all modules
  const modules = filiere.flatMap((f) =>
    f.modules.map((module) => ({
      ...module,
      filiereName: f.name, // Adjusted to match your data structure
    }))
  );

  if (!modules || modules.length === 0) {
    return <p>No modules available.</p>; // Handle case when there are no modules
  }

  function handleEditClick(id) {
    console.log(`Edit Module ID: ${id}`);
    // Implement edit functionality (e.g., open modal, update state)
  }

  function handleDeleteClick(id) {
    console.log(`Delete Module ID: ${id}`);
    // Implement delete functionality (e.g., remove from state)
  }

  return (
    <TableContainer
      sx={{width: "auto" }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Filière Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{module.name}</TableCell> {/* Adjusted field name */}
              <TableCell>{module.filiereName}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(module.id)}
                  variant="outlined"
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(module.id)}
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

export default ModuleTable;
