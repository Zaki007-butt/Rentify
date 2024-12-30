import { useParams } from "react-router-dom";
import { useGetPaymentsByAgreement } from "../../react-query/queries/payment.queries";
import { useUpdatePaymentMutation } from "../../react-query/mutations/payment.mutation";
import { formatDate } from "../../utilities/helpers";
import { Link, useNavigate } from "react-router-dom";

function PaymentsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: payments } = useGetPaymentsByAgreement(id);
  const updatePaymentMutation = useUpdatePaymentMutation();

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
          Agreement # {id} - Payments
        </h1>
      </div>

      <div className="space-y-4">
        {payments?.results?.length === 0 && <p className="text-gray-500 py-5">No payments yet</p>}
        {payments?.results?.map((payment) => (
          <div
            key={payment.id}
            className={`p-4 rounded-lg border ${
              payment.status === "completed"
                ? "border-green-200 bg-green-50"
                : payment.status === "failed"
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Rs. {payment.amount}</p>
                <p className="text-sm text-gray-600">Method: {payment.method}</p>
                {payment.status !== "pending" && payment.date && (
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)} on:
                    </span>{" "}
                    {formatDate(payment.date)}
                  </p>
                )}
                <hr className="my-2" />
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Created:</span> {formatDate(payment.created_at)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">For:</span>{" "}
                  <Link to={`/admin/agreements/${payment.agreement_details.id}`} className="underline text-blue-600">
                    Agreement # {payment.agreement_details.id}
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {payment.status === "pending" ? (
                  <select
                    value={payment.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (newStatus !== "pending") {
                        updatePaymentMutation.mutate({
                          id: payment.id,
                          data: {
                            status: newStatus,
                            date: new Date().toISOString(),
                          },
                        });
                      } else {
                        updatePaymentMutation.mutate({
                          id: payment.id,
                          data: { status: newStatus },
                        });
                      }
                    }}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      payment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentsList;
