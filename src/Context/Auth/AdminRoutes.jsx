import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AdminRoutes = () => {
  const token = localStorage.getItem("auth");
  let decoded;

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.log("Error decoding JWT:", error);
    }

    if (decoded && decoded.role && decoded.role[0] === "ROLE_ADMIN") {
      return <Outlet />;
    } else {
      toast.error("You don't have permission to access this page.");
      return <Navigate to="/home" />;
    }
  }

  toast.warning("Please login first.");
  return <Navigate to="/login" />;
};

export default AdminRoutes;
