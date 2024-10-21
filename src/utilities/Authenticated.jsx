import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserLayout from "../pages/User/UserLayout";

const Authenticated = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <UserLayout>
          <Outlet />
        </UserLayout>
      ) : (
        <Navigate to="/users/login" />
      )}
    </>
  );
};

export default Authenticated;
