import React from "react";
import { getImageUrl } from "../../utilities/helpers";

const PropertyCard = ({
  id,
  title,
  description,
  images,
  price,
  address,
  bedroom,
  washroom,
  area,
  property_category_name,
  rent_or_buy,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Load Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
        crossOrigin="anonymous"
      />

      <a
        href="#"
        className="relative block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
      >
        <div className="rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          {/* Image Section */}
          <div className="relative h-56 w-full">
            <img
              src={getImageUrl(images[0]?.image)}
              alt={title || "Property Image"}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
            {property_category_name && (
              <span className="absolute top-3 right-3 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                {property_category_name}
              </span>
            )}
            {/* Image Count Badge */}
            {images.length > 1 && (
              <span className="absolute bottom-3 right-3 z-10 rounded-full bg-gray-800 bg-opacity-75 px-2 py-1 text-xs font-semibold text-white shadow-md">
                {images.length} images
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Title and Price */}
            <div className="flex justify-between items-center">
              <h2
                className="text-lg font-semibold text-gray-800 line-clamp-1"
                title={title}
              >
                {title}
              </h2>
              <p className="text-primary font-bold text-blue-600 text-lg">
                <span className="text-sm">PKR</span> {price}
              </p>
            </div>

            {/* Description */}
            <p
              className="mt-2 text-gray-600 text-sm line-clamp-2"
              title={description}
            >
              {description}
            </p>

            {/* Rent/Buy Badge */}
            <div className="mt-4">
              <span className="inline-block rounded-lg bg-green-100 px-4 py-1 text-green-600 font-semibold">
                {rent_or_buy}
              </span>
            </div>

            {/* Property Details */}
            <div className="mt-4 flex items-center justify-between text-gray-700">
              {!!bedroom && (
                <div className="flex items-center">
                  <i className="fa fa-bed mr-2 text-blue-600"></i>
                  <span>{bedroom} Beds</span>
                </div>
              )}
              {!!washroom && (
                <div className="flex items-center">
                  <i className="fa fa-bath mr-2 text-blue-600"></i>
                  <span>{washroom} Baths</span>
                </div>
              )}
              {!!area && (
                <div className="flex items-center">
                  <i className="fa fa-home mr-2 text-blue-600"></i>
                  <span>{area} Yd<sup>2</sup></span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t p-4 flex items-center justify-between">
            <span className="text-gray-500 text-sm">Located at: {address}</span>
            <div className="flex space-x-2">
              <button className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                <i className="fa fa-phone"></i>
              </button>
              <button className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                <i className="fa fa-sms"></i>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PropertyCard;
