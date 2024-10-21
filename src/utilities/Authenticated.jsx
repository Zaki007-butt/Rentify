import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Authenticated = () => {
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Navigate to="/users/login" />}</>;
};

export default Authenticated;
