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

const FiliereTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);

  if (!filiere || filiere.length === 0) {
    return <p>No filières available.</p>;
  }

  function handleEditClick(id) {
    console.log(`Edit Filiere ID: ${id}`);
    // Implement edit functionality
  }

  function handleDeleteClick(id) {
    console.log(`Delete Filiere ID: ${id}`);
    // Implement delete functionality
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
            <TableCell>Nom Filière</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filiere.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.id}</TableCell>
              <TableCell>{f.name}</TableCell>{" "}
              {/* Use `name` instead of `nomFiliere` */}
              <TableCell>
                <Button onClick={() => handleEditClick(f.id)}
                  variant="outlined"
                  color="info"
                >Edit</Button>
                <Button
                  onClick={() => handleDeleteClick(f.id)}
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

export default FiliereTable;
