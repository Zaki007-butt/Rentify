import { Link } from "react-router-dom";
import { useGetUserUtilityBills } from "../../react-query/queries/utility-bill.queries";
import Loader from "../../components/shared/Loader";
import { formatDate } from "../../utilities/helpers";
import UtilityBillPaymentForm from "../../components/forms/UtilityBillPaymentForm";
import { useState } from "react";

const UtilityBills = () => {
  const { data: bills, isLoading } = useGetUserUtilityBills();
  const [selectedBill, setSelectedBill] = useState(null);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Utility Bills</h1>

      <div className="bg-white rounded-lg shadow">
        {!bills?.results || bills.results.length === 0 ? (
          <p className="p-4 text-gray-500">No utility bills found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agreement
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill Type
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bills?.results?.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 whitespace-nowrap">
                      <Link
                        to={`/user/agreements/${bill.agreement_details.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Agreement #{bill.agreement_details.id}
                      </Link>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span className="text-gray-900">
                        {bill.agreement_details.property.title}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        ({bill.agreement_details.property.rent_or_buy})
                      </span>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span className="capitalize">{bill.bill_type}</span>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        Rs. {bill.bill_amount}
                      </span>
                      {bill.paid_amount && (
                        <span className="text-green-600 text-sm block">
                          Paid: Rs. {bill.paid_amount}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
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
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(bill.due_date)}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {!bill.paid_date ? (
                        <UtilityBillPaymentForm
                          bill={bill}
                          onSuccess={() => setSelectedBill(null)}
                        />
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-green-600 text-sm">
                            Paid: Rs. {bill.paid_amount}
                          </span>
                          {bill.payment_receipt && (
                            <a
                              href={bill.payment_receipt}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              View Receipt
                            </a>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
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

export default UtilityBills;
