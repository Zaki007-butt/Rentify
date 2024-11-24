import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleAgreement } from "../react-query/queries/agreement.queries";
import Loader from "../components/shared/Loader";
import { formatDate } from "../utilities/helpers";
import PropertyDetailCard from "../components/cards/PropertyDetailCard";
import { useAuth } from "../hooks/useAuth";

function AgreementDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: agreement, isPending, error } = useGetSingleAgreement(id);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-500 text-white rounded-lg"
        >
          &lt;&ensp;Back
        </button>
      </div>

      {user.is_admin && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upload Agreement Image
          </h2>
          <div className="flex items-start justify-center w-full gap-4">
            <div className="w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <button
                onClick={() => navigate(`/admin/agreements/${id}/approve`)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
              >
                Approve
              </button>

              <button
                onClick={() => navigate(`/admin/agreements/${id}/reject`)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Details
          </h1>

          <div className="space-y-4">
            <div>
              <span className="font-bold">Name: </span>
              <span>{agreement?.user_details?.name}</span>
            </div>
            <div>
              <span className="font-bold">Email: </span>
              <span>{agreement?.user_details?.email}</span>
            </div>
            <div>
              <span className="font-bold">CNIC: </span>
              <span>{agreement?.customer?.cnic}</span>
            </div>
            <div>
              <span className="font-bold">Phone Number: </span>
              <span>{agreement?.customer?.phone_number}</span>
            </div>
            <div>
              <span className="font-bold">Address: </span>
              <span>{agreement?.customer?.address}</span>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Agreement Details
          </h1>

          <div className="space-y-4">
            <div>
              <span className="font-bold">Status: </span>
              <span
                className={`${
                  agreement?.status === "pending"
                    ? "text-amber-500"
                    : agreement?.status === "active"
                    ? "text-green-500"
                    : agreement?.status === "cancelled"
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {agreement?.status}
              </span>
            </div>
            <div>
              <span className="font-bold">Created At: </span>
              <span>{formatDate(agreement?.created_at)}</span>
            </div>
            <div>
              <span className="font-bold">Security Amount: </span>
              <span>${agreement?.security_amount}</span>
            </div>
            <div>
              <span className="font-bold">Details: </span>
              <p className="mt-1 text-gray-600">{agreement?.details}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Property Details
          </h2>
          <PropertyDetailCard property={agreement?.property} />
        </div>
      </div>
    </div>
  );
}

export default AgreementDetail;
