import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfRoutes = () => {
  const token = localStorage.getItem("auth");
  console.log("from prof " + token);
  let decoded;

  if (token) {
    try {
      decoded = jwtDecode(token); // Decode the token to get the role
    } catch (error) {
      console.log("Error decoding JWT:", error);
    }
    console.log("from prof and decoded role" + decoded?.role[0]);

    if (decoded && decoded.role && decoded.role[0] === "ROLE_PROFESSEUR") {
      // If role matches, render the children (outlet for nested routes)
      return <Outlet />;
    } else {
      return <Navigate to="/login" />; // Redirect to login if not professor
    }
  }

  return <Navigate to="/login" />; // Redirect to login if no token
};

export default ProfRoutes;
    