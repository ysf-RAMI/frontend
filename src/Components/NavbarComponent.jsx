import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/Untitled design-Photoroom.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function NavbarComponent({ isDrawerOpen, toggleDrawer, isSmallScreen }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
const isProfPage =
  location.pathname === "/prof" ||
  location.pathname === "/admin" ||
  /^\/filiere\/\d+\/module\/\d+$/.test(location.pathname);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = (e) => {
    e.preventDefault();
    toggleDrawer(!isDrawerOpen);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
    style={{userSelect: "none"}}
      expand="lg"
      className={`custom-navbar ${
        isHomePage && !isScrolled ? "transparent-navbar" : "solid-navbar"
      }`}
      fixed="top"
    >
      <Container style={{padding: 3}}>
        <Navbar.Brand href="/">
          {isSmallScreen && isProfPage ? (
            <IconButton
              onClick={handleMenuClick}
              sx={{ transition: "transform 0.3s ease" }}
            >
              {isDrawerOpen ? (
                <Close style={{ color: "white", transform: "rotate(90deg)" }} />
              ) : (
                <Menu style={{ color: "white" }} />
              )}
            </IconButton>
          ) : (
            <img
              src={logo}
              style={{ height: "80px", width: "160px" }}
              alt="Logo"
              className="navbar-brand-img"
            />
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/filiere" className="nav-link">
              Filiere
            </Nav.Link>
            <Button variant="contained" color="primary">Login</Button>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
