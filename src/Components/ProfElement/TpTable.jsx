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


const TpTable = () => {
  const { filiere } = useContext(moduleContext);

  // Iterate over all filières and their modules to get all TDs
  const tps = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TP.map((course) => ({
        ...course,
        moduleName: module.name, // Adjusted field name to match your data structure
        filiereName: f.name, // Adjusted field name to match your data structure
      }))
    )
  );

  if (!tps || tps.length === 0) {
    return <div>No TD available.</div>;
  }

  function handleEditClick(tpID) {
    console.log(`Edit Course ID: ${tpID}`);
  }

  function handleDeleteClick(tpID) {
    console.log(`Edit Course ID: ${tpID}`);
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
          {tps.map((tp, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tp.name}</TableCell>
              <TableCell>{tp.type}</TableCell>
              <TableCell>
                <a
                  href={tp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  TP Link
                </a>
              </TableCell>
              <TableCell>{tp.moduleName}</TableCell>
              <TableCell>{tp.filiereName}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(tp.id)}
                  variant="outlined"
                  color="info"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(tp.id)}
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

export default TpTable;
