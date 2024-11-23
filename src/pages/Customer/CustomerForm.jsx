import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error404 from "../Error/404";
import { useCreateCustomerMutation } from "../../react-query/mutations/customer.mutation";
import { useAuth } from "../../hooks/useAuth";
import { useGetSingleProperty } from "../../react-query/queries/property.queries";
import PropertyDetailCard from "../../components/cards/PropertyDetailCard";

export default function CustomerForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      cnic: "",
      phone_number: "",
      address: "",
      user_id: user.user_id,
    },
  });
  const [searchParams] = useSearchParams();
  const property_id = searchParams.get("property_id");
  if (!property_id) return <Error404 />;
  const {
    data: property,
    isPending,
    error,
  } = useGetSingleProperty(property_id);
  const createCustomerMutation = useCreateCustomerMutation(property_id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error404 message={error.message} />;
  }

  const onSubmit = async (data) => {
    try {
      const createdCustomer = await createCustomerMutation.mutateAsync(data);
      const customerId = createdCustomer.id;
      reset();
      navigate(
        "/user/agreements/create" +
          `?property_id=${property_id}&customer_id=${customerId}`
      );
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <main className="container mt-8 mb-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Provide Details</h1>
      {createCustomerMutation.isError && (
        <div className="mt-4 mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
          Error creating customer. Please try again.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="cnic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CNIC
          </label>
          <input
            id="cnic"
            type="text"
            {...register("cnic", { required: "CNIC is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.cnic && (
            <p className="mt-1 text-sm text-red-600">{errors.cnic.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            type="tel"
            {...register("phone_number", {
              required: "Phone number is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address", { required: "Address is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={createCustomerMutation.isLoading}
        >
          {createCustomerMutation.isLoading ? "Creating..." : "Create Customer"}
        </button>
      </form>
      <br />
      <br />
      <hr></hr>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6">Property Details</h1>

        <PropertyDetailCard property={property} />
      </div>
    </main>
  );
}
