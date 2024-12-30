import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleAgreement } from "../../react-query/queries/agreement.queries";
import { useCreateUtilityBillMutation } from "../../react-query/mutations/utility-bill.mutation";
import Loader from "../../components/shared/Loader";
import { useEffect } from "react";

const UtilityBillForm = () => {
  const { id: agreementId } = useParams();
  const navigate = useNavigate();
  const { data: agreement, isLoading } = useGetSingleAgreement(agreementId);
  const createBillMutation = useCreateUtilityBillMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("agreement", agreementId);
    formData.append("bill_type", data.bill_type);
    formData.append("bill_amount", data.bill_amount);
    formData.append("bill_date", data.bill_date);
    formData.append("due_date", data.due_date);
    if (data.bill_image?.[0]) {
      formData.append("bill_image", data.bill_image[0]);
    }

    await createBillMutation.mutateAsync(formData);
    navigate(`/admin/customers/${agreement.customer.id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-500 text-white rounded-lg text-sm">
          &lt;&ensp;Back
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <div className="mb-8 bg-white rounded-lg shadow p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Agreement # {agreement.id}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Property</p>
              <p className="font-semibold">{agreement.property.title}</p>
            </div>
            <div>
              <p className="text-gray-600">Customer</p>
              <p className="font-semibold">{agreement.user_details.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-semibold">{agreement.property.rent_or_buy}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount</p>
              <p className="font-semibold">${agreement.rent_amount || agreement.purchase_amount}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 flex-1">
          <h2 className="text-2xl font-bold mb-6">Add Utility Bill</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bill Type</label>
            <select
              {...register("bill_type", { required: "Bill type is required" })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Bill Type</option>
              <option value="electricity">Electricity</option>
              <option value="gas">Gas</option>
              <option value="water">Water</option>
              <option value="other">Other</option>
            </select>
            {errors.bill_type && <p className="mt-1 text-sm text-red-600">{errors.bill_type.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bill Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("bill_amount", {
                required: "Bill amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
              })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.bill_amount && <p className="mt-1 text-sm text-red-600">{errors.bill_amount.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bill Date</label>
            <input
              type="date"
              {...register("bill_date", { required: "Bill date is required" })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.bill_date && <p className="mt-1 text-sm text-red-600">{errors.bill_date.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              {...register("due_date", { required: "Due date is required" })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bill Image</label>
            <input type="file" accept="image/*" {...register("bill_image")} className="mt-1 block w-full py-2" />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UtilityBillForm;
