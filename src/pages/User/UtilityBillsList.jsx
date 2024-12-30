import { useParams } from "react-router-dom";
import { useGetUtilityBillsByAgreement } from "../../react-query/queries/utility-bill.queries";
import { useUpdateUtilityBillMutation } from "../../react-query/mutations/utility-bill.mutation";
import { formatDate } from "../../utilities/helpers";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UtilityBillsList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: utilityBills } = useGetUtilityBillsByAgreement(id);
  const updateUtilityBillMutation = useUpdateUtilityBillMutation();
  const [billAmount, setBillAmount] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          Agreement # {id} - Utility Bills
        </h1>
      </div>

      <div className="space-y-4">
        {!utilityBills?.results || utilityBills.results.length === 0 ? (
          <p className="text-gray-500 py-5">No utility bills yet</p>
        ) : (
          utilityBills.results.map((bill) => (
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
                  <p className="text-sm text-gray-600">Amount: Rs. {bill.bill_amount}</p>
                  {bill.paid_date && <p className="text-sm text-gray-600">Paid Amount: Rs. {bill.paid_amount}</p>}
                  <p className="text-sm text-gray-600">Bill Date: {formatDate(bill.bill_date)}</p>
                  <p className="text-sm text-gray-600">Due Date: {formatDate(bill.due_date)}</p>
                  {bill.paid_date && <p className="text-sm text-gray-600">Paid Date: {formatDate(bill.paid_date)}</p>}
                  <hr className="my-2" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">For:</span>{" "}
                    <Link to={`/admin/agreements/${bill.agreement_details.id}`} className="underline text-blue-600">
                      Agreement #{bill.agreement_details.id}
                    </Link>
                  </p>
                </div>

                {!bill.paid_date && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Enter amount"
                        className="w-32 px-2 py-1 text-sm border rounded"
                        onChange={(e) => {
                          const amount = parseFloat(e.target.value);
                          if (amount > 0) {
                            setBillAmount((prevState) => ({
                              ...prevState,
                              [bill.id]: amount,
                            }));
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const amount = billAmount[bill.id];
                          if (amount > 0) {
                            updateUtilityBillMutation.mutate({
                              id: bill.id,
                              data: { paid_amount: amount },
                            });
                          }
                        }}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Pay
                      </button>
                    </div>
                  </div>
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
          ))
        )}
      </div>
    </div>
  );
}

export default UtilityBillsList;
