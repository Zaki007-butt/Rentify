import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaUser, FaHome, FaCog, FaDollarSign, FaFileInvoice } from 'react-icons/fa';

const UserLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const sideNavLinks = [
    { children: "Profile", to: "/user/profile", icon: <FaUser /> },
  ];

  if (user.is_admin) {
    sideNavLinks.push(
      { children: "Properties", to: "/admin/properties", icon: <FaHome /> },
      { children: "Agreements", to: "/admin/agreements", icon: <FaFileInvoice /> },
      { children: "Customers", to: "/admin/customers", icon: <FaUser /> }
    );
  } else {
    sideNavLinks.push(
      { children: "Agreements", to: "/user/agreements", icon: <FaFileInvoice /> },
      { children: "Payments", to: "/user/payments", icon: <FaDollarSign /> },
      { children: "Utility Bills", to: "/user/utility-bills", icon: <FaCog /> }
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 min-w-72 bg-white shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {user.is_admin ? "Admin" : "Customer"} Dashboard
        </h2>
        {/* Navigation Tabs */}
        <div className="space-y-3">
          {sideNavLinks.map((linkProps, i) => (
            <Link
              key={i}
              to={linkProps.to}
              className={`flex items-center space-x-4 px-5 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                location.pathname.includes(linkProps.children.split(" ").join("-").toLowerCase())
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="text-xl">{linkProps.icon}</span>
              <span className="text-lg">{linkProps.children}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
