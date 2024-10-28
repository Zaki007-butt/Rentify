import { useGetUserProfileQuery } from "../../react-query/queries/user.queries";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Profile = () => {
  const { data: userData, error, isPending, isError } = useGetUserProfileQuery();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
        Profile |{" "}
        <Link
          to="/users/edit"
          className="text-lg py-1 px-2 text-blue-500 md:bg-transparent hover:underline"
        >
          Edit
        </Link>
      </h1>
      {/* Profile Content */}
      {isPending ? (
        <div className="flex flex-col items-center">
          <p>Loading...</p>
        </div>
      ) : (
        userData && (
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full shadow-md"
              src="https://via.placeholder.com/150"
              alt="Profile Avatar"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-800">{userData.data.name}</h2>
            <p className="text-gray-500 mt-1">{userData.data.email}</p>
            <p className="text-gray-500 mt-4 uppercase">({userData.data.is_admin ? 'Accountant Admin' : 'Customer'})</p>
            <p className="text-gray-600 mt-4 text-center">
              Passionate about creating web applications and improving user experiences. Currently
              building amazing products at TechCorp.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
