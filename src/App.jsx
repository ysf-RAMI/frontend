import { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { moduleContext } from "./Context/ModuleContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Pages/Home";
import CourseDetail from "./Components/CourseDetail";
import Login from "./Pages/Login";
import Module from "./Pages/Module";
import { filieres } from "./Data/filieres"; 

function App() {
  const [filiere, setFiliere] = useState(filieres);
  const contextValue = useMemo(() => ({ filiere, setFiliere }), [filiere]);

  return (
    <moduleContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/coursedetail/:filiereId" element={<CourseDetail />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/filiere/:filiereId" element={<Module />} />
          <Route path="/*" element={<p>page not found - 404</p>} />
        </Routes>
      </BrowserRouter>
    </moduleContext.Provider>
  );
}

export default App;
