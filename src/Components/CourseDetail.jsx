import { useContext, useMemo } from "react";
import "../styles/CourseDetail.css";
import { moduleContext } from "../Context/ModuleContext";
import { Outlet, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { filiere } = useContext(moduleContext);
  const { filiereId } = useParams();

  // Use useMemo to prevent unnecessary recalculations of the selected filiere on re-renders
  const selectedFiliere = useMemo(() => {
    return filiere.find((f) => f.id === parseInt(filiereId));
  }, [filiere, filiereId]);

  if (!selectedFiliere) {
    return <div className="course-detail">Aucune filière trouvée.</div>;
  }

  return (
    <div style={{marginTop:"100px"}} className="course-detail">
    
      <h1 >{selectedFiliere.nomFiliere}</h1>
      <h2>Modules</h2>
      <ul>
        {selectedFiliere.modules.length > 0 ? (
          selectedFiliere.modules.map((module) => (
            <li key={module.id}>
              <h3>{module.name}</h3>
              <h4>Cours</h4>
              <ul>
                {module.courses.length > 0 ? (
                  module.courses.map((course, index) => (
                    <li key={index}>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {course.name} ({course.type})
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No courses available</li>
                )}
              </ul>

              <h4>TD</h4>
              <ul>
                {module.td.length > 0 ? (
                  module.td.map((td, index) => (
                    <li key={index}>
                      <a
                        href={td.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {td.name} ({td.type})
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No TD available</li>
                )}
              </ul>

              <h4>TP</h4>
              <ul>
                {module.tp.length > 0 ? (
                  module.tp.map((tp, index) => (
                    <li key={index}>
                      <a
                        href={tp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tp.name} ({tp.type})
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No TP available</li>
                )}
              </ul>

              <h4>Corrections</h4>
              <ul>
                {module.corrections.length > 0 ? (
                  module.corrections.map((correction, index) => (
                    <li key={index}>
                      <a
                        href={correction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {correction.name} ({correction.type})
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No corrections available</li>
                )}
              </ul>
            </li>
          ))
        ) : (
          <li>No modules available</li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

export default CourseDetail;
