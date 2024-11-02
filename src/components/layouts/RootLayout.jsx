import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const RootLayout = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar user={user} />
      <div className="container mx-auto pt-16">
        <Outlet />
      </div>
      <Footer />
      <Toaster containerClassName="adjust-hot-toast" />
    </>
  );
};

export default RootLayout;