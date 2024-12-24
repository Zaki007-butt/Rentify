import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleAgreement } from "../react-query/queries/agreement.queries";
import { useUpdateAgreementMutation } from "../react-query/mutations/agreement.mutation";
import Loader from "../components/shared/Loader";
import { formatDate } from "../utilities/helpers";
import PropertyDetailCard from "../components/cards/PropertyDetailCard";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useGetUtilityBillsByAgreement } from "../react-query/queries/utility-bill.queries";
import { useUpdateUtilityBillMutation } from "../react-query/mutations/utility-bill.mutation";

function AgreementDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: agreement, isPending, error } = useGetSingleAgreement(id);
  const updateAgreementMutation = useUpdateAgreementMutation(id);
  const { data: utilityBills } = useGetUtilityBillsByAgreement(id);
  const updateUtilityBillMutation = useUpdateUtilityBillMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      image: null,
      details: "",
      purchase_amount: "",
      purchase_date: new Date().toISOString().split("T")[0],
      security_amount: "",
      rent_amount: "",
      rent_start_date: new Date().toISOString().split("T")[0],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelDetails, setCancelDetails] = useState("");

  const onSubmit = async (data) => {
    const submitData = new FormData();
    if (data.image?.[0]) submitData.append("image", data.image[0]);
    submitData.append("details", data.details);
    submitData.append("status", "active");
    submitData.append("customer_id", agreement?.customer?.id);
    submitData.append("property_id", agreement?.property?.id);

    if (agreement?.property?.rent_or_buy === "buy") {
      if (!data.purchase_amount || !data.purchase_date) {
        toast.error("Please fill in all required fields");
        return;
      }
      submitData.append("purchase_amount", data.purchase_amount);
      submitData.append("purchase_date", data.purchase_date);
    } else {
      if (!data.security_amount || !data.rent_amount || !data.rent_start_date) {
        toast.error("Please fill in all required fields");
        return;
      }
      submitData.append("security_amount", data.security_amount);
      submitData.append("rent_amount", data.rent_amount);
      submitData.append("rent_start_date", data.rent_start_date);

      // Calculate rent_end_date (1 month after rent_start_date)
      const rentStartDate = new Date(data.rent_start_date);
      const rentEndDate = new Date(
        rentStartDate.setMonth(rentStartDate.getMonth() + 1)
      );
      submitData.append(
        "rent_end_date",
        rentEndDate.toISOString().split("T")[0]
      );
    }

    updateAgreementMutation
      .mutateAsync({
        id,
        data: submitData,
      })
      .then(() => {
        toast.success("Agreement approved successfully");
      });
  };

  const handleReject = async () => {
    // Get the details value from the form
    const details = getValues().details;

    if (!details) {
      toast.error("Please provide details before rejecting");
      return;
    }

    try {
      await updateAgreementMutation.mutateAsync({
        id,
        data: {
          status: "cancelled",
          property_id: agreement?.property?.id,
          customer_id: agreement?.customer?.id,
          details: details, // Include the rejection details
        },
      });
      toast.success("Agreement rejected");
    } catch (error) {
      toast.error(error.message || "Failed to reject agreement");
    }
  };

  const handleCancel = async () => {
    if (!cancelDetails) {
      toast.error("Please provide details before cancelling");
      return;
    }

    try {
      await updateAgreementMutation.mutateAsync({
        id,
        data: {
          status: "cancelled",
          property_id: agreement?.property?.id,
          customer_id: agreement?.customer?.id,
          details: cancelDetails, // Include the cancellation details
        },
      });
      toast.success("Agreement cancelled");
      setIsModalOpen(false); // Close the modal after successful cancellation
    } catch (error) {
      toast.error(error.message || "Failed to cancel agreement");
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-900">
          Agreement # {agreement.id}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 border border-gray-300 space-y-6">
          {/* Agreement Status Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Agreement Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`font-semibold ${
                    agreement?.status === "pending"
                      ? "text-amber-600"
                      : agreement?.status === "active"
                      ? "text-green-600"
                      : agreement?.status === "cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {agreement?.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Created At:</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(agreement?.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-900">
                  {agreement?.user_details?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">
                  {agreement?.user_details?.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">CNIC:</span>
                <span className="font-semibold text-gray-900">
                  {agreement?.customer?.cnic}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-semibold text-gray-900">
                  {agreement?.customer?.phone_number}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-semibold text-gray-900">
                  {agreement?.customer?.address}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Note Section */}
          {agreement?.customer_note && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Customer Note</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {agreement.customer_note}
              </p>
            </div>
          )}
        </div>

        <div>
          <div>
            {agreement?.status === "pending" && user.is_admin ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    {/* Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Details
                      </label>
                      <textarea
                        {...register("details", {
                          required: "Details are required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows="4"
                      />
                      {errors.details && (
                        <span className="text-red-500 text-sm">
                          {errors.details.message}
                        </span>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Agreement Image
                      </label>
                      <input
                        type="file"
                        {...register("image")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        accept="image/*"
                      />
                      {errors.image && (
                        <span className="text-red-500 text-sm">
                          {errors.image.message}
                        </span>
                      )}
                    </div>

                    {/* Conditional Fields based on rent_or_buy */}
                    {agreement?.property?.rent_or_buy === "buy" ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Purchase Amount
                          </label>
                          <input
                            type="number"
                            {...register("purchase_amount", {
                              required: "Purchase amount is required",
                              min: {
                                value: 0,
                                message: "Amount must be positive",
                              },
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            step="0.01"
                          />
                          {errors.purchase_amount && (
                            <span className="text-red-500 text-sm">
                              {errors.purchase_amount.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Purchase Date
                          </label>
                          <input
                            type="date"
                            {...register("purchase_date", {
                              required: "Purchase date is required",
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          />
                          {errors.purchase_date && (
                            <span className="text-red-500 text-sm">
                              {errors.purchase_date.message}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Security Amount
                          </label>
                          <input
                            type="number"
                            {...register("security_amount", {
                              required: "Security amount is required",
                              min: {
                                value: 0,
                                message: "Amount must be positive",
                              },
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            step="0.01"
                          />
                          {errors.security_amount && (
                            <span className="text-red-500 text-sm">
                              {errors.security_amount.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Rent Amount
                          </label>
                          <input
                            type="number"
                            {...register("rent_amount", {
                              required: "Rent amount is required",
                              min: {
                                value: 0,
                                message: "Amount must be positive",
                              },
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            step="0.01"
                          />
                          {errors.rent_amount && (
                            <span className="text-red-500 text-sm">
                              {errors.rent_amount.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Rent Start Date
                          </label>
                          <input
                            type="date"
                            {...register("rent_start_date", {
                              required: "Start date is required",
                            })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          />
                          {errors.rent_start_date && (
                            <span className="text-red-500 text-sm">
                              {errors.rent_start_date.message}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleReject}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      disabled={updateAgreementMutation.isPending}
                    >
                      {updateAgreementMutation.isPending
                        ? "Rejecting..."
                        : "Reject"}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      disabled={updateAgreementMutation.isPending}
                    >
                      {updateAgreementMutation.isPending
                        ? "Approving..."
                        : "Approve"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="bg-gray-100 rounded-lg shadow-md p-6 border border-gray-300 space-y-6">
                  {agreement?.status !== "cancelled" && agreement?.image && (
                    <div className="bg-white rounded-lg p-4 border border-gray-200 relative">
                      <h3 className="font-bold text-gray-900 mb-3">
                        Agreement Document
                      </h3>
                      {agreement?.details && (
                        <p className="text-gray-700 whitespace-pre-wrap mb-4">
                          {agreement.details}
                        </p>
                      )}
                      <img
                        src={agreement.image}
                        alt="Agreement Document"
                        className="max-w-full h-auto rounded-lg border border-gray-300"
                      />
                      {agreement?.property?.rent_or_buy === "rent" &&
                        user.is_admin && (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                          >
                            Cancel
                          </button>
                        )}
                      {agreement.status === "active" && user.is_admin && (
                        <button
                          onClick={() =>
                            navigate(`/admin/payments/create/${agreement.id}`)
                          }
                          className="px-3 py-1 mt-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Add Payment
                        </button>
                      )}
                    </div>
                  )}

                  {/* Modal for Cancellation Details */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-lg font-bold mb-4">
                          Cancel Agreement
                        </h3>
                        <textarea
                          value={cancelDetails}
                          onChange={(e) => setCancelDetails(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 mb-4"
                          rows="4"
                          placeholder="Provide cancellation details..."
                        />
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                          >
                            Close
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                          >
                            Confirm Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {agreement?.status !== "cancelled" &&
                  (agreement.purchase_amount || agreement.rent_amount) ? (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3">
                        {agreement?.property?.rent_or_buy === "buy"
                          ? "Purchase Information"
                          : "Rental Information"}
                      </h3>
                      <div className="space-y-3">
                        {agreement?.property?.rent_or_buy === "buy" ? (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Purchase Amount:
                              </span>
                              <span className="font-semibold text-gray-900">
                                ${agreement.purchase_amount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Purchase Date:
                              </span>
                              <span className="font-semibold text-gray-900">
                                {formatDate(agreement.purchase_date)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Rent Amount:
                              </span>
                              <span className="font-semibold text-gray-900">
                                ${agreement.rent_amount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Security Amount:
                              </span>
                              <span className="font-semibold text-gray-900">
                                ${agreement.security_amount}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Rent Start Date:
                              </span>
                              <span className="font-semibold text-gray-900">
                                {formatDate(agreement.rent_start_date)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Rent End Date:
                              </span>
                              <span className="font-semibold text-gray-900">
                                {formatDate(agreement.rent_end_date)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3">Details</h3>
                      <p className="text-rose-700 whitespace-pre-wrap mb-4">
                        {agreement.details || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg shadow-md p-6 my-8 border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Property Details
        </h2>
        <PropertyDetailCard property={agreement?.property} />
      </div>

      {/* Add button next to existing buttons */}
      {agreement?.status === "active" && user?.is_admin && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/admin/payments/create/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Payment
          </button>
          <button
            onClick={() => navigate(`/admin/utility-bills/create/${id}`)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Utility Bill
          </button>
        </div>
      )}

      {/* Add Utility Bills section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Utility Bills</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {utilityBills?.results?.length === 0 ? (
            <p className="text-gray-500">No utility bills found</p>
          ) : (
            utilityBills?.results?.map((bill) => (
              <div
                key={bill.id}
                className={`p-4 rounded-lg border ${
                  bill.paid_date
                    ? "border-green-200 bg-green-50"
                    : new Date(bill.due_date) < new Date()
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium capitalize">{bill.bill_type} Bill</p>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          bill.paid_date
                            ? "bg-green-100 text-green-800"
                            : new Date(bill.due_date) < new Date()
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {bill.paid_date ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Amount: Rs. {bill.bill_amount}
                    </p>
                    {bill.paid_date && (
                      <p className="text-sm text-gray-600">
                        Paid Amount: Rs. {bill.paid_amount}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Bill Date: {formatDate(bill.bill_date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due Date: {formatDate(bill.due_date)}
                    </p>
                    {bill.paid_date && (
                      <p className="text-sm text-gray-600">
                        Paid Date: {formatDate(bill.paid_date)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {!bill.paid_date && user?.is_admin && (
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        className="w-32 px-2 py-1 text-sm border rounded"
                        onChange={(e) => {
                          const amount = parseFloat(e.target.value);
                          if (amount > 0) {
                            updateUtilityBillMutation.mutate({
                              id: bill.id,
                              data: { paid_amount: amount }
                            });
                          }
                        }}
                      />
                    )}
                    {bill.bill_image && (
                      <a
                        href={bill.bill_image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Bill
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AgreementDetail;
