import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleProperty } from "../react-query/queries/property.queries";
import PropertyDetailCard from "../components/cards/PropertyDetailCard";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, data: property } = useGetSingleProperty(id);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pt-20 container mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Back
      </button>

      <PropertyDetailCard property={property} />
    </div>
  );
};

export default PropertyDetail;
