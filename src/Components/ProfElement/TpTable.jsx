import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useContext, useState } from "react";
import moduleContext from "../../Context/ModuleContext";
import { Button, Modal, Form } from "react-bootstrap";

const TPTable = () => {
  const { filiere, setFiliere } = useContext(moduleContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTP, setSelectedTP] = useState(null);

  // Iterate over all filières and their modules to get all TPs
  const tps = filiere.flatMap((f) =>
    f.modules.flatMap((module) =>
      module.TP.map((tp) => ({
        ...tp,
        moduleName: module.moduleName,
        filiereName: f.nomFiliere,
      }))
    )
  );

  if (!tps || tps.length === 0) {
    return <div>No TP available.</div>;
  }

  const handleEditClick = (tp) => {
    setSelectedTP(tp);
    setShowModal(true);
  };

  const handleDeleteClick = (tpId) => {
    // Handle delete functionality (you can add functionality here)
    alert(`Delete TP with ID: ${tpId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTP(null);
  };

  const handleSaveChanges = () => {
    // Save changes (you can add logic to update the TP here)
    alert("Changes saved");
    setShowModal(false);
  };

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
            {tps.map((tp, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tp.tpName}</TableCell>
                <TableCell>{tp.tpType}</TableCell>
                <TableCell>
                  <a
                    href={tp.tpUrl}
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
                  <Button onClick={() => handleEditClick(tp)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(tp.tpId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing TP */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit TP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTP && (
            <Form>
              <Form.Group controlId="tpName">
                <Form.Label>TP Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter TP name"
                  value={selectedTP.tpName}
                  onChange={(e) =>
                    setSelectedTP({
                      ...selectedTP,
                      tpName: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="tpType">
                <Form.Label>TP Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter TP type"
                  value={selectedTP.tpType}
                  onChange={(e) =>
                    setSelectedTP({
                      ...selectedTP,
                      tpType: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="tpUrl">
                <Form.Label>TP Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter TP URL"
                  value={selectedTP.tpUrl}
                  onChange={(e) =>
                    setSelectedTP({
                      ...selectedTP,
                      tpUrl: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TPTable;
