import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <Container fluid={true} className="footerSection">
      <Row>
        <Col className="">
          <h6 className="footerName text-center">
            Copyright © 2025 Ecole Superieure de Technologie - Guelmim . All Rights Reserved.
          </h6>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
