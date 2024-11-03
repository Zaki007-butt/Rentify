function PropertyDetailCard({ property }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.prod.website-files.com/660739d2e6e8ec9445dd91a2/66430dbcfc6b6bcdcdb8c334_What%20is%20a%20software%20house%20.webp"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://www.shutterstock.com/image-vector/real-estate-3d-icon-house-260nw-2281376283.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="max-w-full mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-full md:pl-6 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
            <p className="text-sm text-gray-600 mt-2">
              {property.address} {property.city}
            </p>
            <p className="text-xl font-semibold text-gray-800 mt-4">Rs. {property.price}</p>
            <p className="text-gray-700 mt-4">{property.description}</p>
            <div className="flex flex-wrap mt-4">
              {property.bedroom && (
                <div className="w-1/2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Bedrooms:</span> {property.bedroom}
                  </p>
                </div>
              )}
              {property.washroom && (
                <div className="w-1/2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Washrooms:</span> {property.washroom}
                  </p>
                </div>
              )}
              {property.area && (
                <div className="w-1/2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Area:</span> {property.area} Yard sq
                  </p>
                </div>
              )}
              {property.property_category_name && (
                <div className="w-1/2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {property.property_category_name}
                  </p>
                </div>
              )}
              {property.property_type_name && (
                <div className="w-1/2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Sub Category:</span>{" "}
                    {property.property_type_name}
                  </p>
                </div>
              )}
              {property.rent_or_buy && (
                <div className="w-1/2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Property Nature:</span> {property.rent_or_buy}
                  </p>
                </div>
              )}
              {property.city && (
                <div className="w-1/2 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">City:</span> {property.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetailCard;
