import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleProperty } from "../react-query/queries/property.queries";
import PropertyDetailCard from "../components/cards/PropertyDetailCard";
import { useAuth } from "../hooks/useAuth";
import { useGetCustomer } from "../react-query/queries/customer.queries";

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isPending, data: property } = useGetSingleProperty(id);
  // Check if customer has already provided details
  const {
    data: customerData,
    isPending: isGetCustomerLoading,
    error: isGetCustomerError,
  } = useGetCustomer();

  const handleRequestAgreement = () => {
    if (!user) navigate("/users/login");
    else if (
      !isGetCustomerLoading &&
      !isGetCustomerError &&
      customerData.customer
    ) {
      navigate(
        "/user/agreements/create" +
          `?property_id=${id}&customer_id=${customerData.customer.id}`
      );
    } else navigate(`/user/customers/create?property_id=${id}`);
  };

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pt-20 container mx-auto">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-slate-500 text-white rounded-lg"
        >
          &lt;&ensp;Back
        </button>

        <button
          onClick={handleRequestAgreement}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Request {property.rent_or_buy} agreement&ensp;&gt;
        </button>
      </div>

      <PropertyDetailCard property={property} />
      <br />
      <br />
    </div>
  );
};

export default PropertyDetail;
