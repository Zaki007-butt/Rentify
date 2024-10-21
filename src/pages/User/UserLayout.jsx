import { Link, useLocation } from "react-router-dom";

const UserLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Dashboard</h2>
        {/* Navigation Tabs */}
        <div className="space-y-2">
          <Link
            to="/users/profile"
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              location.pathname.includes("profile")
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            Profile
          </Link>
          <Link
            to="/properties/create"
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              location.pathname.includes("properties")
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            Properties
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="bg-white p-6 shadow rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
