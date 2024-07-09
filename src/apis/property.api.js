import axios from "axios"
import { BASE_URL } from "../config/config"

export const getProperties = (categoryID, subcategoryID, searchKeyword) => {
  let params = {};

  if (categoryID) {
    params['category_id'] = categoryID;
  }
  if (subcategoryID) {
    params['type_id'] = subcategoryID;
  }
  if (searchKeyword) {
    params['search'] = searchKeyword;
  }

  const queryString = new URLSearchParams(params).toString();
  const URL = `${BASE_URL}/properties/?${queryString}`;

  return axios.get(URL);
};
export const getPropertiesCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories/`)
  return data
}

export const getPropertiesCategoryTypes = async (categoryId) => {
  const { data } = await axios.get(`${BASE_URL}/categories/${categoryId}/types/`);
  return data;
};

export const getSingleProperty = async (propertyID) => {
  const { data } = await axios.get(`${BASE_URL}/properties/${propertyID}/`);
  return data;
};


export const createProperty = async (propertyData) => {
  let data = {
    ...propertyData
  }
  const response = await axios.post(`${BASE_URL}/properties/`, data);
  return response;
}
