import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import "../styles/Navbar.css";
import logo from "../assets/logo_0.png";

const NavbarComponent = () => {
  const [isSolid, setIsSolid] = useState(false); // State to track scroll position
  const navigate = useNavigate();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSolid(true); // Navbar becomes solid after scrolling 50px
      } else {
        setIsSolid(false); // Navbar becomes transparent again
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the /login route
  };

  const handleFiliereClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/filiere");
  };

  const handleHomeClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/", { state: { scrollToTop: true } }); // Navigate to Home with state
  };

  return (
    <Navbar
      style={{ userSelect: "none" }}
      expand="lg"
      fixed="top"
      className={`custom-navbar ${isSolid ? "solid-navbar" : ""}`} // Dynamic class based on scroll
    >
      <Container>
        <Navbar.Brand href="/" onClick={handleHomeClick}>
          <img src={logo} alt="Logo" width="200" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as="span" onClick={handleHomeClick}>
              Home
            </Nav.Link>
            <Nav.Link as="span" onClick={handleFiliereClick}>
              Filière
            </Nav.Link>
            <Button
              onClick={handleLoginClick}
              variant="primary"
              className="nav-btn"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
