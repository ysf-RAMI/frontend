import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DynamicTable = ({ section, data }) => {
  // Define column headers for each section
  const columnHeaders = {
    filiere: ["ID", "Name", "Link", "Filière Name", "Action"],
    module: ["ID", "Name", "Link", "Module Name", "Action"],
    cors: ["ID", "Name", "Link", "Cors Name", "Action"],
    td: ["ID", "Name", "Link", "TD Name", "Action"],
    tp: ["ID", "Name", "Link", "TP Name", "Action"],
    exam: ["ID", "Name", "Link", "Exam Name", "Action"],
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columnHeaders[section].map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.link}</TableCell>
              <TableCell>
                {row.filiereName || row.moduleName || row.name}
              </TableCell>
              <TableCell>
                <button>Edit</button>
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
