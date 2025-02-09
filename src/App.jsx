import { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { moduleContext } from "./Context/ModuleContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import { filieres } from "./Data/filieres";
import Filiere from "./Pages/Fillier";
import FiliereDetails from "./Pages/FiliereDetails";
import ModuleDetails from "./Pages/ModuleDetails"; // Import the new component
import { NotFound } from "./Pages/NotFound";

function App() {
  const [filiere, setFiliere] = useState(filieres);

  const contextValue = useMemo(() => ({ filiere, setFiliere }), [filiere]);

  return (
    <moduleContext.Provider value={contextValue}>
      <BrowserRouter>
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </moduleContext.Provider>
  );
}

export default App;
