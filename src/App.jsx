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
import { NotFound } from "./Pages/NotFound";
import NavbarComponent from "./Components/NavbarComponent";
import Prof from "./Pages/Prof";
import CorsTable from "./Components/ProfElement/CorsTable";
import ExamTable from "./Components/ProfElement/ExamTable";
import FiliereTable from "./Components/ProfElement/FillierTable";
import ModuleTable from "./Components/ProfElement/ModuleTable";
import TDTable from "./Components/ProfElement/TdTable";
import TPTable from "./Components/ProfElement/TpTable";
import Profile from "./Pages/Profile";

function App() {
  const [filiere, setFiliere] = useState(filieres);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      // Automatically close the drawer on small screens
      if (isSmall) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true); // Always open on larger screens
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <moduleContext.Provider value={{ filiere, setFiliere }}>
      <BrowserRouter>
        <NavbarComponent
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          isSmallScreen={isSmallScreen}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/filiere" element={<Filiere />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cr"
            element={
              <>
                <FiliereTable />
                <ModuleTable />
                <CorsTable />
                <TDTable />
                <TPTable />
                <ExamTable />
              </>
            }
          />
          <Route path="/filiere/:filiereId" element={<FiliereDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/filiere/:filiereId/module/:moduleId"
            element={<ModuleDetails />}
          />
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </moduleContext.Provider>
  );
}

export default App;
