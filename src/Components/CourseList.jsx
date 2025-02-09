import { Card, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const CourseList = () => {
  // Static data for courses
  const courses = [
    {
      id: 1,
      name: "Introduction to Programming",
      description: "Learn the basics of programming with Java.",
    },
    {
      id: 2,
      name: "Web Development with React",
      description: "Build modern websites using React.js.",
    },
    {
      id: 3,
      name: "Database Management Systems",
      description: "Learn how to manage and design relational databases.",
    },
    {
      id: 4,
      name: "Data Structures and Algorithms",
      description:
        "Master data structures and algorithms for software development.",
    },
  ];

  return (
    <div className="course-list">
      <h2 className="section-title">Explore Our Courses</h2>
      <Row className="course-row">
        {courses.map((course) => (
          <Col key={course.id} md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="course-card">
                <Card.Body>
                  <Card.Title className="course-title">
                    {course.name}
                  </Card.Title>
                  <Card.Text className="course-description">
                    {course.description}
                  </Card.Text>
                  <Button
                    href={`/course/${course.id}`}
                    variant="primary"
                    className="course-btn"
                  >
                    View Course
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseList;
