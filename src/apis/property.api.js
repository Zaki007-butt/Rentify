import api from ".";

export const getProperties = (categoryID, subcategoryID, searchKeyword, pageSize) => {
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
  if(pageSize) {
    params["page_size"] = pageSize;
  }

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
  const { data } = await api.get(`/properties/${propertyID}/`);
  return data;
};

export const createProperty = async (propertyData) => {
  let data = {
    ...propertyData,
  };
  const response = await api.post(`/properties/`, data);
  return response;
};
