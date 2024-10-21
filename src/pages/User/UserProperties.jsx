import { Link } from "react-router-dom";

function UserProperties() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Properties</h1>
      {/* Properties Content */}
      <Link
        to="/properties/create"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Property
      </Link>
      <p className="text-gray-600 my-4">
        Here will be the list of properties to be managed by user...
      </p>
    </div>
  );
}

export default UserProperties;
