import React, { useEffect } from "react";
import { useGetUserProfileQuery } from "../../react-query/queries/user.queries";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../../hooks/useAuth";

const Profile = ({ propertiesData }) => {
  const { user } = useAuth();
  const {
    data: userData,
    error,
    isPending,
    isError,
  } = useGetUserProfileQuery();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  const totalProperties = propertiesData?.total || 0;
  const soldProperties = propertiesData?.sold || 0;
  const onRentProperties = propertiesData?.onRent || 0;
  const onHoldProperties = propertiesData?.onHold || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* User Profile Section */}
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
              <p className="text-gray-600 mt-4 text-center">
                Passionate about creating web applications.
              </p>
            </div>
          )
        )}
      </div>

      {/* Property Stats Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <CircularProgressbar
            value={(totalProperties / totalProperties) * 100 || 100}
            text={`${totalProperties}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#1d4ed8", // Blue for total
              textColor: "#1d4ed8",
              trailColor: "#e0f2fe",
            })}
          />
          <p className="text-lg mt-4">Total Properties</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <CircularProgressbar
            value={(soldProperties / totalProperties) * 100 || 0}
            text={`${soldProperties}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#16a34a", // Green for sold
              textColor: "#16a34a",
              trailColor: "#e5f8e7",
            })}
          />
          <p className="text-lg mt-4">Sold Properties</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <CircularProgressbar
            value={(onRentProperties / totalProperties) * 100 || 0}
            text={`${onRentProperties}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#eab308", // Yellow for on rent
              textColor: "#eab308",
              trailColor: "#fef9c3",
            })}
          />
          <p className="text-lg mt-4">On Rent</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <CircularProgressbar
            value={(onHoldProperties / totalProperties) * 100 || 0}
            text={`${onHoldProperties}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#dc2626", // Red for on hold
              textColor: "#dc2626",
              trailColor: "#fee2e2",
            })}
          />
          <p className="text-lg mt-4">On Hold</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <CircularProgressbar
            value={(onHoldProperties / totalProperties) * 100 || 0}
            text={`${onHoldProperties}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#dc2626", // Red for on hold
              textColor: "#dc2626",
              trailColor: "#fee2e2",
            })}
          />
          <p className="text-lg mt-4">Pending Requests</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
