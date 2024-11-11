import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSingleProperty } from "../../react-query/queries/property.queries";
import PropertyDetailCard from "../../components/cards/PropertyDetailCard";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useCreateAgreementMutation } from "../../react-query/mutations/agreement.mutation";

function AgreementForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property_id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      security_amount: "",
      property_id: propertyId,
      user_id: user.user_id,
    },
  });

  const { data: property, isPending, error } = useGetSingleProperty(propertyId);
  const { mutateAsync: createAgreement } = useCreateAgreementMutation();

  const onSubmit = (data) => {
    createAgreement(data);
  };

  if (isPending) {
    return <div>Loading...</div>;
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

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create {property?.rent_or_buy} Agreement
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PropertyDetailCard property={property} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Agreement Details
              </label>
              <textarea
                id="details"
                {...register("details", { required: "Details are required" })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.details && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.details.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="security_amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Security Amount
              </label>
              <input
                type="number"
                id="security_amount"
                {...register("security_amount", {
                  required: "Security amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than 0",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.security_amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.security_amount.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={createAgreement.isPending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
            >
              {createAgreement.isPending
                ? "Submitting..."
                : "Submit Agreement Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgreementForm;
