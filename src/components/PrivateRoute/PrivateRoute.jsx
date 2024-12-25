import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
