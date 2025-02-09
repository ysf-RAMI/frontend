import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CoursePreview.css";

// eslint-disable-next-line react/prop-types
const CoursePreview = ({ course }) => {
  return (
    <Card className="course-card">
      <Card.Img
        variant="top"
        src={course.thumbnail || "/default-thumbnail.jpg"}
      />
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Link to={`/course/${course.id}`}>
          <Button variant="primary">View Course</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CoursePreview;
