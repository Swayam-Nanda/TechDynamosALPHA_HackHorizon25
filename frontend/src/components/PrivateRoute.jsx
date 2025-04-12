import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth(); // Get the user state from the AuthContext

  if (!user) {
    // If the user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return <Outlet />; // If logged in, render the protected component
};

export default PrivateRoute;
