import api from ".";

export const getProperties = (categoryID, subcategoryID, searchKeyword, type, pageSize) => {
  let params = {};

  if (categoryID) {
    params["category_id"] = categoryID;
  }
  if (subcategoryID) {
    params["type_id"] = subcategoryID;
  }
  if (searchKeyword) {
    params["search"] = searchKeyword;
  }
  if (pageSize) {
    params["page_size"] = pageSize;
  }
  if (type) params["type"] = type;

  const queryString = new URLSearchParams(params).toString();
  const URL = `/properties/?${queryString}`;

  return api.get(URL);
};
export const getPropertiesCategories = async () => {
  const { data } = await api.get(`/categories/`);
  return data;
};

export const getPropertiesCategoryTypes = async (categoryId) => {
  const { data } = await api.get(`/categories/${categoryId}/types/`);
  return data;
};

export const getSingleProperty = async (propertyID) => {
  if (!propertyID) return null;
  const { data } = await api.get(`/properties/${propertyID}/`);
  return data;
};

export const createProperty = async (propertyData) => {
  const response = await api.post("/properties/", propertyData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProperty = async ({ id, data }) => {
  const response = await api.put(`/properties/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteSingleProperty = async (propertyId) => {
  if (!propertyId) return null;
  const { data } = await api.delete(`/properties/${propertyId}/`);
  return data;
};
