import { getImageUrl } from "../../utilities/helpers";

function PropertyDetailCard({ property }) {
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {property.images && property.images.length > 0 ? (
          property.images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                className="h-auto max-w-full rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                src={getImageUrl(image.image)}
                alt={`Property Image ${index + 1}`}
              />
              <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded-full shadow">
                {index + 1}/{property.images.length}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 md:col-span-3">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://www.shutterstock.com/image-vector/real-estate-3d-icon-house-260nw-2281376283.jpg"
              alt="Placeholder Image"
            />
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
        <p className="text-sm text-gray-600">{property.address}, {property.city}</p>
        <p className="text-2xl font-semibold text-blue-600 mt-4">
          Rs. {property.price.toLocaleString()}
        </p>
        <p className="text-gray-700 mt-4">{property.description}</p>

        {/* Property Features */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.bedroom && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-bed text-blue-600"></i>
              <p>
                <span className="font-semibold">Bedrooms:</span> {property.bedroom}
              </p>
            </div>
          )}
          {property.washroom && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-bath text-blue-600"></i>
              <p>
                <span className="font-semibold">Washrooms:</span> {property.washroom}
              </p>
            </div>
          )}
          {property.area && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-home text-blue-600"></i>
              <p>
                <span className="font-semibold">Area:</span> {property.area} Yd<sup>2</sup>
              </p>
            </div>
          )}
          {property.property_category_name && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-tag text-blue-600"></i>
              <p>
                <span className="font-semibold">Category:</span> {property.property_category_name}
              </p>
            </div>
          )}
          {property.property_type_name && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-list text-blue-600"></i>
              <p>
                <span className="font-semibold">Sub Category:</span> {property.property_type_name}
              </p>
            </div>
          )}
          {property.rent_or_buy && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-handshake text-blue-600"></i>
              <p>
                <span className="font-semibold">Property Nature:</span> {property.rent_or_buy}
              </p>
            </div>
          )}
          {property.city && (
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fa fa-city text-blue-600"></i>
              <p>
                <span className="font-semibold">City:</span> {property.city}
              </p>
            </div>
          )}
        </div>

        {/* Call-to-Actions */}
        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button className="w-full md:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailCard;
