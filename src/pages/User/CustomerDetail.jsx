import { useParams } from "react-router-dom";
import { useGetCustomerById } from "../../react-query/queries/customer.queries";
import Loader from "../../components/shared/Loader";

function CustomerDetail() {
  const { id } = useParams();
  const { data: customer, isPending } = useGetCustomerById(id);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active':
        return {
          container: 'bg-green-50 border border-green-200',
          badge: 'bg-green-100 text-green-800'
        };
      case 'cancelled':
        return {
          container: 'bg-red-50 border border-red-200',
          badge: 'bg-red-100 text-red-800'
        };
      case 'pending':
        return {
          container: 'bg-yellow-50 border border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          container: 'bg-gray-50 border border-gray-200',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">Customer Details</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{customer?.user?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{customer?.user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">CNIC:</span>
                  <span className="font-semibold text-gray-900">{customer?.cnic || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone Number:</span>
                  <span className="font-semibold text-gray-900">{customer?.phone_number || 'N/A'}</span>
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

          <div>
            <h2 className="text-lg font-semibold mb-4">Agreements</h2>
            <div className="space-y-4">
              {customer?.agreements?.length > 0 ? (
                customer.agreements.map((agreement) => {
                  const statusStyle = getStatusStyles(agreement.status);
                  return (
                    <div 
                      key={agreement.id} 
                      className={`p-3 rounded-md ${statusStyle.container}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">
                            Property: {agreement.property?.title || 'N/A'}
                          </span>
                          <div className="text-sm text-gray-600 mt-1">
                            Type: {agreement.property?.rent_or_buy?.toUpperCase() || 'N/A'}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm ${statusStyle.badge}`}>
                          {agreement.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Date: {new Date(agreement.created_at).toLocaleDateString()}
                      </div>
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
  );
}

export default CustomerDetail; 