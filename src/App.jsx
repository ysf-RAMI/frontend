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
import CorsTable from "./Components/ProfElement/CorsTable";
import Prof from "./Pages/Prof";
import TDTable from "./Components/ProfElement/TDTable";
import TPTable from "./Components/ProfElement/TPTable";
import ExamTable from "./Components/ProfElement/ExamTable";

function App() {
  const [filiere, setFiliere] = useState(filieres);
  const [theme, setTheme] = useState("light");

  // Detect system theme
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);



  return (
    <moduleContext.Provider value={{ filiere, setFiliere }}>
      <BrowserRouter>
        <NavbarComponent /> {/* Navbar is now included here for all pages */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/filiere" element={<Filiere />} />
          <Route path="/login" element={<Login />} />
          <Route path="/filiere/:filiereId" element={<FiliereDetails />} />
          <Route
            path="/filiere/:filiereId/module/:moduleId"
            element={<ModuleDetails />}
          />
          <Route path="/cr" element={<ExamTable />} />
          <Route path="/prof" element={<Prof />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </moduleContext.Provider>
  );
}

export default App;
