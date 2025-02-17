import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import moduleContext from "./Context/ModuleContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import { filieres } from "./Data/filieres";
import Filiere from "./Pages/Fillier";
import FiliereDetails from "./Pages/FiliereDetails";
import ModuleDetails from "./Pages/ModuleDetails";
import { NotFound } from "./Pages/notFound";
import NavbarComponent from "./Components/NavbarComponent";
import Prof from "./Pages/Prof";
import Admin from "./Pages/admin";
import Profile from "./Pages/Profile";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "./Components/Loading"; // Import the Loading component

function App() {
  const [filiere, setFiliere] = useState([]); // Initialize as empty array
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true); // Real loading state

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      setIsDrawerOpen(!isSmall); // Fermeture auto sur mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Simulate fetching data and initializing AOS
    const initializeApp = async () => {
      try {
        // Simulate fetching filieres data (replace with real API call)
        const fetchFiliereData = new Promise((resolve) => {
          setTimeout(() => {
            setFiliere(filieres); // Set fetched data
            resolve();
          }, 100); // Simulate 1-second delay
        });

        // Initialize AOS
        AOS.init({
          duration: 500,
          easing: "ease-in-out-quart",
          delay: 100,
        });

        // Wait for all async operations to complete
        await Promise.all([fetchFiliereData]);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    initializeApp();
  }, []);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  // Render the Loading component if isLoading is true
  if (isLoading) {
    return <Loading />;
  }

  return (
    <moduleContext.Provider value={{ filiere, setFiliere }}>
      <BrowserRouter>
        <NavbarComponent
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          isSmallScreen={isSmallScreen}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/filiere" element={<Filiere />} />
          <Route path="/filiere/:filiereId" element={<FiliereDetails />} />
          <Route
            path="/filiere/:filiereId/module/:moduleId"
            element={
              <ModuleDetails
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                isSmallScreen={isSmallScreen}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/prof"
            element={
              <Prof
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                isSmallScreen={isSmallScreen}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                isSmallScreen={isSmallScreen}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </moduleContext.Provider>
  );
}

export default App;
