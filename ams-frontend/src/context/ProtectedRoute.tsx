import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./auth";

const ProtectedRoute = () => {
  // const { user } = useAuth();

  // if (!user.isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }


  const condition = false;

  if (condition) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
