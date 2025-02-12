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


const TDTable = () => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all TDs
  const tds = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TD.map((course) => ({
        ...course,
        moduleName: module.name, // Adjusted field name to match your data structure
        filiereName: f.name, // Adjusted field name to match your data structure
      }))
    )
  );

  if (!tds || tds.length === 0) {
    return <div>No TD available.</div>;
  }

  function handleEditClick(tdID) {
    console.log(`Edit Course ID: ${tdID}`);
  }

  function handleDeleteClick(tdID) {
    console.log(`Edit Course ID: ${tdID}`);
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
          {tds.map((td, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{td.name}</TableCell>
              <TableCell>{td.type}</TableCell>
              <TableCell>
                <a
                  href={td.url}
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
                <Button
                  onClick={() => handleEditClick(td.id)}
                  variant="outlined"
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(td.id)}
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

export default TDTable;
