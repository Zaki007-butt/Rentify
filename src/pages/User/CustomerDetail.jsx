import { useParams, useNavigate } from "react-router-dom";
import { useGetCustomerById } from "../../react-query/queries/customer.queries";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlus } from "react-icons/fa";

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: customer, isPending } = useGetCustomerById(id);

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return {
          container: "bg-green-50 border border-green-200",
          badge: "bg-green-100 text-green-800",
        };
      case "cancelled":
        return {
          container: "bg-red-50 border border-red-200",
          badge: "bg-red-100 text-red-800",
        };
      case "pending":
        return {
          container: "bg-yellow-50 border border-yellow-200",
          badge: "bg-yellow-100 text-yellow-800",
        };
      default:
        return {
          container: "bg-gray-50 border border-gray-200",
          badge: "bg-gray-100 text-gray-800",
        };
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-slate-500 text-white rounded-lg text-sm me-4 font-medium"
          >
            &lt;&ensp;Back
          </button>
          Customer Details
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{customer?.user?.name || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{customer?.user?.email || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">CNIC:</span>
                  <span className="font-semibold text-gray-900">{customer?.cnic || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone Number:</span>
                  <span className="font-semibold text-gray-900">{customer?.phone_number || "N/A"}</span>
                </div>
                {customer?.address && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-semibold text-gray-900">{customer.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Agreements</h2>
              <div className="space-y-4">
                {customer?.agreements?.length > 0 ? (
                  customer.agreements.map((agreement) => {
                    const statusStyle = getStatusStyles(agreement.status);
                    return (
                      <div key={agreement.id} className={`p-3 rounded-md ${statusStyle.container}`}>
                        <Link to={`/admin/agreements/${agreement.id}`} className="flex justify-between items-center">
                          <span className="font-bold underline text-blue-500">Agreement # {agreement.id}</span>
                        </Link>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">
                              <span className="font-bold">Property:</span> {agreement.property?.title || "N/A"}
                            </span>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="font-bold">Type:</span>{" "}
                              {agreement.property?.rent_or_buy?.toUpperCase() || "N/A"}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-sm ${statusStyle.badge}`}>
                            {agreement.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Date: {new Date(agreement.created_at).toLocaleDateString()}
                        </div>
                        {agreement.status === "active" || agreement.status === "cancelled" ? (
                          <div className="flex gap-2 mt-2">
                            {agreement.status === "active" && (
                              <>
                                <button
                                  onClick={() => navigate(`/admin/agreements/${agreement.id}/payments/create`)}
                                  className="px-2 py-1 h-7 text-nowrap text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                  <FaPlus className="inline me-1" />
                                  Add Payment
                                </button>
                                <button
                                  onClick={() => navigate(`/admin/agreements/${agreement.id}/utility-bills/create`)}
                                  className="px-2 py-1 h-7 text-nowrap text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                  <FaPlus className="inline me-1" />
                                  Add Bill
                                </button>
                                <span className="text-gray-500">&nbsp;|&nbsp;</span>
                              </>
                            )}
                            <button
                              onClick={() => navigate(`/admin/agreements/${agreement.id}/utility-bills`)}
                              className="px-3 py-1 h-7 text-nowrap text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                              View Bills
                              <FaArrowRight className="inline ms-1" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/agreements/${agreement.id}/payments`)}
                              className="px-3 py-1 h-7 text-nowrap text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                            >
                              View Payments
                              <FaArrowRight className="inline ms-1" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No agreements found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
