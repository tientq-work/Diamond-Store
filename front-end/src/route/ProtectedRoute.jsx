import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const roleMapping = {
  1: "Admin",
  2: "Manager",
  3: "Sales Staff",
  4: "Delivery Staff",
  5: "Member",
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRoleId = localStorage.getItem("roleId");
  const userRole = roleMapping[parseInt(userRoleId)];

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
