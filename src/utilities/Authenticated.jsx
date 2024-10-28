import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserLayout from "../pages/User/UserLayout";
import img_404 from "../assets/404.jpg";

const Authenticated = ({ admin }) => {
  const { user } = useAuth();

  return (
    <>
      {user && admin ? (
        <UserLayout>
          {admin === user.is_admin ? (
            <Outlet />
          ) : (
            <div className="flex justify-center">
              <img src={img_404} width={800} />
            </div>
          )}
        </UserLayout>
      ) : user ? (
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
