import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Prof from "../Pages/Prof";

const ParentComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <NavbarComponent
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Prof isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default ParentComponent;
