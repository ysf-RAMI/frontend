import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo_0.png";

function NavbarComponent() {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/login";

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${isHomePage ? "transparent-navbar" : "solid-navbar"}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="navbar-brand-img" />
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
            <Nav.Link href="/login" className="nav-link">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
