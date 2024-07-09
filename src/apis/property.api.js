import axios from "axios"
import { BASE_URL } from "../config/config"

export const getProperties = (categoryID, searchKeyword) => {
  let URL = `${BASE_URL}/properties/`
  if (categoryID) {
    URL = `${BASE_URL}/properties/?category_id=${categoryID}`
  }
  if (searchKeyword) {
    URL = `${BASE_URL}/properties/?search=${searchKeyword}`
  }
  if (categoryID && searchKeyword) {
    URL = `${BASE_URL}/properties/?search=${searchKeyword}&&category_id=${categoryID}`
  }
  return axios.get(URL)
}

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
