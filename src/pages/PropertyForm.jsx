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

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get property ID from URL parameters
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(1);

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
    }
  }, [existingProperty, setValue]);

  const onSubmit = async (formData) => {
    if (id) {
      // Update existing property
      console.log("editing data:", formData);
      const updated = await updateProperty({ id, ...formData });
      console.log("updated: ", updated);
      toast.success("Property Updated");
      navigate(`/admin/properties/${id}`);
    } else {
      // Create a new property
      await createProperty(formData);
      toast.success("Property Created");
      navigate("/admin/properties");
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
        {id ? "Edit Property" : "Create Property"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
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
            defaultValue: selectedCategory,
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
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
            <div></div>
            <div>
              <label
                htmlFor="washroom"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
