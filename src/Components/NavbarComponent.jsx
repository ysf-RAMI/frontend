import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo_0.png";
import { useLocation } from "react-router-dom";

function NavbarComponent({ isDrawerOpen, toggleDrawer, isSmallScreen }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const isProfPage = location.pathname === "/prof";

  const handleMenuClick = (e) => {
    e.preventDefault();
    toggleDrawer(!isDrawerOpen);
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${isHomePage ? "transparent-navbar" : "solid-navbar"}`}
      fixed="top"
    >
      <Container>
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
            <img src={logo} alt="Logo" className="navbar-brand-img" />
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
