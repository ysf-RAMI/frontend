import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logoSite.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../styles/Navbar.css";
import { Button } from "@mui/material";
import { UserAuth } from "../Context/Auth/UserAuth";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Logout,
  Person,
} from "@mui/icons-material"; // Import icons
import { Menu as MuiMenu, MenuItem } from "@mui/material"; // Import Menu components
import { ThemeContext } from "../Context/ThemeContext"; // Import ThemeContext for theme toggle

function NavbarComponent({ isDrawerOpen, toggleDrawer, isSmallScreen }) {
  const location = useLocation();
  const [name, setName] = useState("");
  const { auth, setAuth } = useContext(UserAuth); // Access the auth state and setAuth function from context
  const [userType, setUserType] = useState("");
  const [chemin, setChemin] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Access theme context
  const navigate = useNavigate();

  // Update the user name based on the decoded token whenever auth changes
  useEffect(() => {
    if (auth && auth.token) {
      try {
        const decode = jwtDecode(auth.token); // Decode the JWT token
        if (decode.role[0] === "ROLE_ADMIN") {
          setChemin("/admin");
        } else {
          setChemin("/prof");
        }
        setName(decode.sub); // Set the user's name from the decoded token
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [auth]); // This hook runs whenever the auth state changes

  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const isProfPage =
    location.pathname === "/prof" ||
    location.pathname === "/admin" ||
    /^\/filiere\/\d+\/module\/\d+$/.test(location.pathname);

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

  const handleMenuClick = (e) => {
    e.preventDefault();
    toggleDrawer(!isDrawerOpen);
  };

  // Logout function to clear localStorage and update context
  const handleLogout = () => {
    toast.success("Logged out successfully!"); // Display toast
    localStorage.removeItem("auth"); // Clear auth from local storage
    setAuth(null); // Update context
    navigate("/"); // Navigate to home page
  };

  // Handle dropdown menu open
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // Conditionally render the navbar based on the route
  if (location.pathname === "/prof" || location.pathname === "/admin") {
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
              alt="Logo"
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
                    padding: "0 20px",
                    marginLeft: "10px",
                    color: "white",
                    borderColor: "#0dcaf0",
                    hover: { color: "white", backgroundColor: "#0dcaf0" },
                    active: { color: "white", backgroundColor: "#0dcaf0" },
                  }}
                  href="/login"
                >
                  Login
                </Button>
              )}
            </div>
            {auth && (
              <>
                <IconButton
                  onClick={handleDropdownOpen}
                  sx={{ color: "white", marginLeft: "10px" }}
                >
                  <AccountCircle />
                </IconButton>
                <MuiMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleDropdownClose}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Person sx={{ marginRight: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={toggleTheme}>
                    {darkMode ? (
                      <Brightness7 sx={{ marginRight: 1 }} />
                    ) : (
                      <Brightness4 sx={{ marginRight: 1 }} />
                    )}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ marginRight: 1 }} /> Logout
                  </MenuItem>
                </MuiMenu>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
