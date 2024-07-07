import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePropertyMutation } from '../react-query/mutations/property.mutation';
import { useGetPropertiesCategories } from '../react-query/queries/property.queries';
import { useGetPropertyTypesQuery } from '../react-query/queries/property.queries';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { mutateAsync } = useCreatePropertyMutation();
  const { data: categories, isLoading: isLoadingCategories } = useGetPropertiesCategories();
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } = useGetPropertyTypesQuery(selectedCategory, !!selectedCategory);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    await mutateAsync(formData);
    navigate('/');
  };

  // Watch the selected category
  const watchCategory = watch('property_category');
  useEffect(() => {
    if (watchCategory) {
      setSelectedCategory(watchCategory);
    }
  }, [watchCategory]);

  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl">Add new Property</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Title</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required', maxLength: { value: 200, message: 'Title cannot exceed 200 characters' } })}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

        <label htmlFor="description" className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white">Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description"
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <label htmlFor="price" className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white">Price</label>
        <input
          id="price"
          type="number"
          {...register('price', { required: 'Price is required', min: { value: 0.01, message: 'Price must be greater than 0' } })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Price"
        />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}

        <label htmlFor="address" className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white">Address</label>
        <input
          id="address"
          type="text"
          {...register('address', { required: 'Address is required', maxLength: { value: 255, message: 'Address cannot exceed 255 characters' } })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
        />
        {errors.address && <span className="text-red-500">{errors.address.message}</span>}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="bedroom" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Bedroom</label>
            <input
              id="bedroom"
              type="number"
              {...register('bedroom', { min: { value: 0, message: 'Bedroom count cannot be negative' } })}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bedroom"
            />
            {errors.bedroom && <span className="text-red-500">{errors.bedroom.message}</span>}
          </div>

          <div>
            <label htmlFor="washroom" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Washroom</label>
            <input
              id="washroom"
              type="number"
              {...register('washroom', { min: { value: 0, message: 'Washroom count cannot be negative' } })}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Washroom"
            />
            {errors.washroom && <span className="text-red-500">{errors.washroom.message}</span>}
          </div>

        </div>

        <div className='mt-2'>
          <label htmlFor="area" className="my-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Area (sqft)</label>
          <input
            id="area"
            type="number"
            {...register('area', { min: { value: 0, message: 'Area must be greater than 0' } })}
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Area (sqft)"
          />
          {errors.area && <span className="text-red-500">{errors.area.message}</span>}
        </div>

        <label htmlFor="property_category" className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white">Property Category</label>
        <select
          id="property_category"
          {...register('property_category', { required: 'Property category is required' })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        {errors.property_category && <span className="text-red-500">{errors.property_category.message}</span>}

        <label htmlFor="property_type" className="mb-2 mt-4 text-sm font-medium text-gray-900 sr-only dark:text-white">Property Type</label>
        <select
          id="property_type"
          {...register('property_type', { required: 'Property type is required' })}
          className="block w-full p-4 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled={!selectedCategory}
        >
          {isLoadingPropertyTypes ? (
            <option>Loading...</option>
          ) : (
            propertyTypes && propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))
          )}
        </select>
        {errors.property_type && <span className="text-red-500">{errors.property_type.message}</span>}

        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
