import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleAgreement } from "../../react-query/queries/agreement.queries";
import { useCreatePaymentMutation } from "../../react-query/mutations/payment.mutation";
import Loader from "../../components/shared/Loader";
import { useEffect } from "react";

const PaymentForm = () => {
  const { id: agreementId } = useParams();
  const navigate = useNavigate();
  const { data: agreement, isLoading } = useGetSingleAgreement(agreementId);
  const createPaymentMutation = useCreatePaymentMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createPaymentMutation.mutateAsync({
      ...data,
      agreement: agreementId,
      status: "pending",
    });
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
          <h2 className="text-2xl font-bold mb-6">Add Payment</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
              })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              {...register("method", {
                required: "Payment method is required",
              })}
              className="mt-1 block w-full py-2 rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
              <option value="other">Other</option>
            </select>
            {errors.method && <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>}
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
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
