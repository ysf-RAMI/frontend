import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import Filiere from "./Pages/Fillier";
import FiliereDetails from "./Pages/FiliereDetails";
import ModuleDetails from "./Pages/ModuleDetails";
import { NotFound } from "./Pages/notFound";
import NavbarComponent from "./Components/NavbarComponent";
import Prof from "./Pages/Prof";
import Admin from "./Pages/Admin";
import "aos/dist/aos.css";
import AdminRoutes from "./Context/Auth/AdminRoutes";
import ProfRoutes from "./Context/Auth/ProfRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AnnouncementsPage from "./Pages/AnnouncementsPage";
import Hamout from "./Pages/Hamout";
import { AboutPage } from "./Pages/AboutPage";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

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


          <Route path="/*" element={<NotFound />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/hamout" element={<Hamout />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
