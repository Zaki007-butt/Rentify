import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const sideNavLinks = [
    {
      children: "Profile",
      to: "/users/profile",
    },
  ];

  if (user.is_admin) sideNavLinks.push({ children: "Properties", to: "/admin/properties" }, {children: "Customers", to: "/admin/customers"});

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Dashboard</h2>
        {/* Navigation Tabs */}
        <div className="space-y-2">
          {sideNavLinks.map((linkProps, i) => (
            <Link
              key={i}
              {...linkProps}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                location.pathname.includes(linkProps.children.toLowerCase())
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition`}
            />
          ))}
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
