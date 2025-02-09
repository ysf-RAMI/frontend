import { useContext } from "react";
import { moduleContext } from "../Context/ModuleContext";

export default function Module({ moduleId }) {
  const { module } = useContext(moduleContext);
  const moduleInfo = module.find((m) => m.id === moduleId);

  return (
    <>
      {moduleInfo ? (
        <div>
          <h2>{moduleInfo.name}</h2>
          
        </div>
      ) : (
        <p>Module non trouvé</p>
      )}
    </>
  );
}
