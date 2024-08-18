import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { token, role } = useContext(AuthContext);
  console.log("Token:", token); // Debugging line
  console.log("Role:", role); // Debugging line
  console.log("Allowed Roles:", allowedRoles); // Debugging line

  const isAllowed = allowedRoles.includes(role);
  const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  
  return accessibleRoute;
};

export default ProtectedRoutes;
