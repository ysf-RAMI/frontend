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
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "./Components/Loading";
import UserAuthProvider from "./Context/Auth/UserAuth";
import AdminRoutes from "./Context/Auth/AdminRoutes";
import ProfRoutes from "./Context/Auth/ProfRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { useTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  const [filiere, setFiliere] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    // Set the data-theme attribute on the root element
    document.documentElement.setAttribute(
      "data-theme",
      theme.palette.mode === "dark" ? "dark" : "light"
    );
  }, [theme.palette.mode]);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      setIsDrawerOpen(!isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const fetchFiliereData = new Promise((resolve) => {
          setTimeout(() => {
            setFiliere(filieres);
            resolve();
          }, 100);
        });

        AOS.init({
          duration: 500,
          easing: "ease-in-out-quart",
          delay: 100,
        });

        await Promise.all([fetchFiliereData]);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="userProfile">
      <ToastContainer
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
        newestOnTop={true}
        closeButton={false}
        enableMultiContainer={true}
        position="top-center"
        zIndex={9999}
      />
      <ThemeContextProvider>
        <UserAuthProvider>
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
                <Route
                  path="/filiere/:filiereId"
                  element={<FiliereDetails />}
                />
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

                <Route element={<AdminRoutes />}>
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
                </Route>

                <Route element={<ProfRoutes />}>
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
                </Route>

                <Route path="/profile" element={<Profile />} />

                <Route path="/*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </moduleContext.Provider>
        </UserAuthProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
