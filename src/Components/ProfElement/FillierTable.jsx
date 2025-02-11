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

const FiliereTable = ({ open }) => {
  const { filiere, setFiliere } = useContext(moduleContext);

  if (!open || !filiere || filiere.length === 0) {
    return null; // Return nothing if the table is not open or there are no filières
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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filiere.map((f, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{f.nomFiliere}</TableCell>
              <TableCell>
                <a
                  href={f.filiereUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  Filière Link
                </a>
              </TableCell>
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

export default FiliereTable;
