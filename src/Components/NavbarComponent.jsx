import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, Close, Logout, Person } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logoSite.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Button, Menu as MuiMenu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function NavbarComponent({ isDrawerOpen, toggleDrawer, isSmallScreen }) {
  const location = useLocation();
  const [name, setName] = useState("");
  const [chemin, setChemin] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

  useEffect(() => {
    if (auth && auth.token) {
      try {
        const decode = jwtDecode(auth.token);
        setChemin(decode.role[0] === "ROLE_ADMIN" ? "/admin" : "/prof");
        setName(decode.sub);
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Failed to decode authentication token.");
      }
    }
  }, [auth]);

  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const isProfPage =
    location.pathname === "/prof" ||
    location.pathname === "/admin" ||
    /^\/filiere\/\d+\/module\/\d+$/.test(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (e) => {
    e.preventDefault();
    toggleDrawer(!isDrawerOpen);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  if (isProfPage) {
    return null;
  }

  return (
    <Navbar
      style={{ userSelect: "none" }}
      expand="lg"
      className={`custom-navbar ${
        isHomePage && !isScrolled ? "transparent-navbar" : "solid-navbar"
      }`}
      fixed="top"
    >
      <Container style={{ padding: 0 }}>
        <Navbar.Brand href="/">
          {isSmallScreen && isProfPage ? (
            <IconButton
              onClick={handleMenuClick}
              sx={{ transition: "transform 0.3s ease" }}
              aria-label="Toggle drawer"
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
              style={{ height: "120px", width: "160px" }}
              alt="Site Logo"
              className="navbar-brand-img"
            />
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div
              className="ms-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Nav.Link href="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="/filiere" className="nav-link">
                Filiere
              </Nav.Link>
              <Nav.Link href="/announcements" className="nav-link">
                Annonce
              </Nav.Link>
              {auth && (
                <Nav.Link href={chemin} className="nav-link">
                  Dashboard
                </Nav.Link>
              )}
              {!auth && (
                <Button
                  variant="contained"
                  style={{
                    borderRadius: "17px",
                    marginLeft: "10px",
                    color: "white",
                    backgroundColor: "#1dcaf0",
                  }}
                  href="/login"
                >
                  Login
                </Button>
              )}
            </div>
            {auth && (
              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  <Person sx={{ marginRight: 1 }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ marginRight: 1 }} /> Logout
                </MenuItem>
              </MuiMenu>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
