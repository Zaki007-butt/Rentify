import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleProperty } from "../react-query/queries/property.queries";
import PropertyDetailCard from "../components/cards/PropertyDetailCard";
import { useAuth } from "../hooks/useAuth";

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isPending, data: property } = useGetSingleProperty(id);

  const handleRequestAgreement = () => {
    if (!user) navigate("/users/login");
    else if (false) navigate(`/user/agreements/create?property_id=${id}`); // if customer_id exist for this customer
    else navigate(`/user/customers/create?property_id=${id}`);
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
