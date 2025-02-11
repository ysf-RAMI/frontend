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

const TDTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all TDs
  const tds = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TD.map((td) => ({
        ...td,
        moduleName: module.moduleName,
        filiereName: f.nomFiliere,
      }))
    )
  );

  if (!tds || tds.length === 0) {
    return <div>No TD available.</div>;
  }

  function handleEditClick() {
    // Handle edit functionality (you can add functionality here)
  }

  function handleDeleteClick() {
    // Handle delete functionality (you can add functionality here)
  }

  return (
    <>
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
            {tds.map((td, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{td.tdName}</TableCell>
                <TableCell>{td.tdType}</TableCell>
                <TableCell>
                  <a
                    href={td.tdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "black" }}
                  >
                    TD Link
                  </a>
                </TableCell>

                <TableCell>{td.moduleName}</TableCell>
                <TableCell>{td.filiereName}</TableCell>
                <TableCell>
                  <Button onClick={handleEditClick}>Edit</Button>
                  <Button onClick={handleDeleteClick}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TDTable;
