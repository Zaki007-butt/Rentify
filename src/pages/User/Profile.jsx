import React, { useEffect } from "react";
import { useGetUserProfileQuery } from "../../react-query/queries/user.queries";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { data: userData, error, isPending, isError } = useGetUserProfileQuery();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
          Profile |{" "}
          <Link
            to={user.is_admin ? "/admin/profile/edit" : "/user/profile/edit"}
            className="text-lg py-1 px-2 text-blue-700 hover:underline"
          >
       
            Edit
          </Link>
        </h1>
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
              <h2 className="text-xl font-semibold mt-4 text-gray-800">
                {userData.data.name}
              </h2>
              <p className="text-gray-500 mt-1">{userData.data.email}</p>
              <p className="text-gray-500 mt-4 uppercase">
                ({userData.data.is_admin ? "Accountant Admin" : "Customer"})
              </p>
              {/* <p className="text-gray-600 mt-4 text-center">
                Passionate about creating web applications.
              </p> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
