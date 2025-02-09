import { Card, Button } from "react-bootstrap";

const DocumentList = () => {
  const documents = [
    { id: 1, title: "Course 101 - Notes", file: "/docs/course101.pdf" },
    { id: 2, title: "Course 102 - Assignments", file: "/docs/course102.pdf" },
  ];

  return (
    <div className="document-list">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <Card.Body>
            <Card.Title>{doc.title}</Card.Title>
            <Button href={doc.file} variant="secondary" target="_blank">
              Download PDF
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DocumentList;
