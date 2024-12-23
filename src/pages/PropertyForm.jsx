import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from "../react-query/mutations/property.mutation"; // Import update mutation
import {
  useGetPropertiesCategories,
  useGetSingleProperty,
} from "../react-query/queries/property.queries";
import { useGetPropertyTypesQuery } from "../react-query/queries/property.queries";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the property ID
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import api from "../apis";
import { getImageUrl } from "../utilities/helpers";

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get property ID from URL parameters
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      uploaded_images: undefined, // Initialize as undefined instead of null
      title: "",
    },
  });
  const [selectedCategory, setSelectedCategory] = useState();

  const { mutateAsync: createProperty } = useCreatePropertyMutation();
  const { mutateAsync: updateProperty } = useUpdatePropertyMutation(id); // Define the update mutation
  const { data: categories, isLoading: isLoadingCategories } =
    useGetPropertiesCategories();
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } =
    useGetPropertyTypesQuery(selectedCategory, !!selectedCategory);

  // Fetch existing property data
  const { data: existingProperty, isLoading: isLoadingProperty } =
    useGetSingleProperty(id);

  useEffect(() => {
    if (existingProperty) {
      // Set form values with existing property data
      setValue("title", existingProperty.title);
      setValue("description", existingProperty.description);
      setValue("price", existingProperty.price);
      setValue("address", existingProperty.address);
      setValue("city", existingProperty.city);
      setValue("bedroom", existingProperty.bedroom);
      setValue("washroom", existingProperty.washroom);
      setValue("area", existingProperty.area);
      setValue("property_category", existingProperty.property_category);
      setSelectedCategory(existingProperty.property_category);
      setValue("property_type", existingProperty.property_type);
      setValue("rent_or_buy", existingProperty.rent_or_buy);
    }
  }, [existingProperty, setValue]);

  const onSubmit = async (formData) => {
    const submitData = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "uploaded_images") {
        // Handle multiple images
        Array.from(formData[key]).forEach((file) => {
          submitData.append("uploaded_images", file);
        });
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      if (id) {
        await updateProperty({ id, data: submitData });
        toast.success("Property Updated");
        navigate(`/admin/properties/${id}`);
      } else {
        await createProperty(submitData);
        toast.success("Property Created");
        navigate("/admin/properties");
      }
    } catch (error) {
      toast.error(error.message || "Failed to save property");
    }
  };

  const watchCategory = watch("property_category");
  useEffect(() => {
    console.log("watchCategory", watchCategory);
    if (watchCategory && watchCategory !== "Loading...") {
      setSelectedCategory(watchCategory);
      if (watchCategory == 2 || watchCategory == 3) {
        setValue("bedroom", 0);
        setValue("washroom", 0);
      }
    }
  }, [watchCategory]);

  if (isLoadingProperty || isLoadingCategories || isLoadingPropertyTypes) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-1">
        {id ? "Edit Property" : "Add Property"}
      </h1>

      {existingProperty?.images && existingProperty.images.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            {existingProperty.images.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={getImageUrl(image.image)}
                  alt="Property"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await api.delete(`/api/properties/${id}/delete_image/`, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ image_id: image.id }),
                      });
                      // Refresh the property data
                      queryClient.invalidateQueries(["property", id]);
                      toast.success("Image deleted successfully");
                    } catch (error) {
                      toast.error("Failed to delete image");
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="my-6" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        {/* Add the image upload field after the title field */}
        <div className="mb-4">
          <label
            htmlFor="uploaded_images"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Images
          </label>
          <input
            type="file"
            id="uploaded_images"
            accept="image/*"
            multiple
            {...register("uploaded_images")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              border border-gray-300 rounded-lg"
          />
          {errors.uploaded_images && (
            <span className="text-red-500 text-sm">
              {errors.uploaded_images.message}
            </span>
          )}
        </div>

        {/* Form fields remain the same as before */}
        {/* Example for title */}
        <label
          htmlFor="title"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 200,
              message: "Title cannot exceed 200 characters",
            },
          })}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Title"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        <label
          htmlFor="description"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Description"
          rows={6}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

        <label
          htmlFor="price"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Price
        </label>
        <input
          id="price"
          type="text"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be greater than 0" },
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Price"
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}

        <label
          htmlFor="address"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Address
        </label>
        <input
          id="address"
          type="text"
          {...register("address", {
            required: "Address is required",
            maxLength: {
              value: 255,
              message: "Address cannot exceed 255 characters",
            },
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="Address"
        />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}

        <label
          htmlFor="city"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Address
        </label>
        <input
          id="city"
          type="text"
          {...register("city", {
            required: "City is required",
            maxLength: {
              value: 255,
              message: "City cannot exceed 255 characters",
            },
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
          placeholder="City"
        />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}

        <label
          htmlFor="property_category"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Property Category
        </label>
        <select
          id="property_category"
          {...register("property_category", {
            defaultValue: 1,
            required: "Property category is required",
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
        >
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        {errors.property_category && (
          <span className="text-red-500">
            {errors.property_category.message}
          </span>
        )}

        <label
          htmlFor="property_type"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Property Type
        </label>
        <select
          id="property_type"
          {...register("property_type", {
            required: "Property type is required",
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
          disabled={!selectedCategory}
        >
          {isLoadingPropertyTypes ? (
            <option>Loading...</option>
          ) : (
            propertyTypes &&
            propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))
          )}
        </select>
        {errors.property_type && (
          <span className="text-red-500">{errors.property_type.message}</span>
        )}

        <div className="mt-2">
          <label
            htmlFor="area"
            className="my-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Area (sqft)
          </label>
          <input
            id="area"
            type="number"
            {...register("area", {
              min: { value: 0, message: "Area must be greater than 0" },
            })}
            className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Area (yard sq)"
          />
          {errors.area && (
            <span className="text-red-500">{errors.area.message}</span>
          )}
        </div>

        {selectedCategory != 2 && selectedCategory != 3 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label
                htmlFor="bedroom"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Bedroom
              </label>
              <input
                id="bedroom"
                type="number"
                {...register("bedroom", {
                  value: 0,
                  min: {
                    value: 0,
                    message: "Bedroom count cannot be negative",
                  },
                })}
                className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="Bedroom"
              />
              {errors.bedroom && (
                <span className="text-red-500">{errors.bedroom.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="washroom"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Washroom
              </label>
              <input
                id="washroom"
                type="number"
                {...register("washroom", {
                  value: 0,
                  min: {
                    value: 0,
                    message: "Washroom count cannot be negative",
                  },
                })}
                className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="Washroom"
              />
              {errors.washroom && (
                <span className="text-red-500">{errors.washroom.message}</span>
              )}
            </div>
          </div>
        )}

        <label
          htmlFor="rent_or_buy"
          className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Rent or Buy
        </label>
        <select
          id="rent_or_buy"
          {...register("rent_or_buy", {
            defaultValue: "buy",
            required: "Please select an option",
          })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        {errors.rent_or_buy && (
          <span className="text-red-500">{errors.rent_or_buy.message}</span>
        )}

        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-3 w-1/3 bg-blue-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-4 w-2/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {id ? "Update Property" : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
