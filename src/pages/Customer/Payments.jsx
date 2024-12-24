import { Link } from "react-router-dom";
import { useGetUserPayments } from "../../react-query/queries/payment.queries";
import Loader from "../../components/shared/Loader";
import { formatDate } from "../../utilities/helpers";

const Payments = () => {
  const { data: payments, isLoading } = useGetUserPayments();

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Payments</h1>

      <div className="bg-white rounded-lg shadow">
        {!payments?.results || payments.results.length === 0 ? (
          <p className="p-4 text-gray-500">No payments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agreement
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments?.results?.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <Link
                        to={`/user/agreements/${payment.agreement_details.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Agreement #{payment.agreement_details.id}
                      </Link>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="text-gray-900">
                        {payment.agreement_details.property.title}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        ({payment.agreement_details.property.rent_or_buy})
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        Rs. {payment.amount}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="capitalize">{payment.method}</span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.status !== "pending" && payment.date
                        ? formatDate(payment.date)
                        : formatDate(payment.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments; 